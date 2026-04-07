import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./chat.css";

function ChatWithJobSeeker({ userId }) {

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const company = JSON.parse(sessionStorage.getItem("mydata"));

  // 🔥 LOAD MESSAGES
  useEffect(() => {

    if (!userId || !company) return;

    fetchMessages();

    const interval = setInterval(fetchMessages, 2000); // auto refresh

    return () => clearInterval(interval);

  }, [userId]);

  // ✅ GET MESSAGES
  const fetchMessages = () => {
    Axios.get(`http://localhost:1337/api/getMessages/${userId}/${company.Company_id}`)
      .then((res) => {
        setMessages(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  };

  // ✅ SEND MESSAGE
  const sendMessage = () => {

    if (!msg.trim()) return;

    Axios.post("http://localhost:1337/api/sendMessage", {
      sender_id: company.Company_id,
      receiver_id: userId,
      message: msg,
      sender_type: "company"
    })
    .then(() => {
      setMsg("");
      fetchMessages();
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="chat-page">

      <h3>Chat with Job Seeker</h3>

      {/* CHAT BOX */}
      <div className="chat-box">

        {messages.length === 0 ? (
          <div className="chat-empty">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((m, index) => (
            <div
              key={index}
              className={`chat-message ${
                m.sender_type === "company" ? "employer" : "seeker"
              }`}
            >
              <div className="chat-text">{m.message}</div>
              <small className="chat-time">
                {m.sender_type === "company" ? "You" : "User"} -{" "}
                {new Date(m.created_at).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}

      </div>

      {/* INPUT */}
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default ChatWithJobSeeker;