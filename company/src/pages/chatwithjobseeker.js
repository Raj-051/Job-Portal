import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./chat.css";

function Chatwithjobseeker() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState("");

  const companyData = JSON.parse(sessionStorage.getItem("mydata") || "{}");
  const companyName = companyData ? companyData.Company_name : "";

  const fetchMessages = async () => {
    if (!companyName) return;
    try {
      const res = await Axios.get(`http://localhost:1337/api/company-messages?company=${companyName}&type=chat`);
      const data = res.data.data || res.data || [];
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [companyName]);

  // Group messages by unique sender
  const getGroupedUsers = () => {
    const usersMap = new Map();
    messages.forEach(msg => {
      if (!usersMap.has(msg.sender)) {
        usersMap.set(msg.sender, {
          sender: msg.sender,
          email: msg.email,
          latestDate: msg.created_at,
          latestSub: msg.message,
        });
      } else {
        // Update to latest message
        usersMap.set(msg.sender, {
          sender: msg.sender,
          email: msg.email,
          latestDate: msg.created_at,
          latestSub: msg.message,
        });
      }
    });
    return Array.from(usersMap.values()).reverse(); // latest first
  };

  const groupedUsers = getGroupedUsers();
  const activeChatMessages = selectedUser ? messages.filter(m => m.sender === selectedUser.sender) : [];

  const sendReply = async () => {
    if (!replyText.trim()) return;
    // Bind reply to the absolute LAST message row sent by the user
    const lastMsgId = activeChatMessages[activeChatMessages.length - 1]?.id;
    if (!lastMsgId) return;

    try {
      await Axios.post("http://localhost:1337/api/reply", { id: lastMsgId, reply: replyText });
      setReplyText("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="company-inbox-page">
      <section className="inbox-banner-header">
        <div className="container">
          <h2>Candidate Inbox</h2>
          <p>Logged in as: <strong>{companyName}</strong></p>
        </div>
      </section>

      <div className="container basic-inbox-grid">
        
        {/* LEFT: USERS LIST */}
        <div className="inbox-sidebar-list">
          <div className="sidebar-list-top">
            <h3>Active Chats</h3>
            <span className="msg-total-badge">{groupedUsers.length}</span>
          </div>
          <div className="msg-scroll-container">
            {groupedUsers.length === 0 ? (
              <p style={{textAlign:"center", color:"#94a3b8", marginTop:"20px"}}>No conversations yet.</p>
            ) : (
              groupedUsers.map((user) => (
                <div 
                  key={user.sender} 
                  className={`msg-preview-card ${selectedUser?.sender === user.sender ? "active" : ""}`}
                  onClick={() => { setSelectedUser(user); setReplyText(""); }}
                >
                  <div className="sender-av">{user.sender.charAt(0).toUpperCase()}</div>
                  <div className="sender-info">
                    <h4>{user.sender}</h4>
                    <p>{user.latestSub}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: DETAILED MESSAGE VIEW */}
        <div className="message-reading-pane">
          {selectedUser ? (
            <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
              <div className="reading-header">
                <h3>{selectedUser.sender}</h3>
                <span>{selectedUser.email}</span>
              </div>

              <div className="thread-conversation-body">
                {activeChatMessages.map((msg, idx) => (
                  <React.Fragment key={idx}>
                    <div className="received-message-bubble">
                      {msg.message}
                    </div>
                    {msg.reply && (
                      <div className="sent-response-bubble">
                        {msg.reply}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="reply-composer-footer">
                <textarea 
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                ></textarea>
                <button className="inbox-reply-btn" onClick={sendReply}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-inbox-view">
              Select a candidate from the left to view the conversation.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Chatwithjobseeker;