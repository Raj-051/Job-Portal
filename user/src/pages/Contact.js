import React, { useEffect, useState } from "react";
import "./contact.css";
import Axios from "axios";
import Swal from "sweetalert2";

function Contact() {
  const userData = JSON.parse(sessionStorage.getItem("mydata") || "{}");
  const userId = userData?.User_id;

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    id: userId || "",
    name: "",
    email: userData?.email || "",
    message: "",
  });

  useEffect(() => {
    if (userId) {
      fetchAppliedCompanies();
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const res = await Axios.get(`http://localhost:1337/api/getuser/${userId}`);
      if (res.data && res.data.Name) {
        setFormData(prev => ({ ...prev, name: res.data.Name, email: res.data.email || prev.email }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppliedCompanies = async () => {
    try {
      const res = await Axios.get(`http://localhost:1337/api/user-applied-companies/${userId}`);
      if (res.data.success) {
        setCompanies(res.data.data);
      }
    } catch (err) {}
  };

  const selectCompany = (comp) => {
    setSelectedCompany(comp);
    fetchMessages(formData.name, comp.Company_name);
  };

  const fetchMessages = async (user, company) => {
    try {
      const res = await Axios.get(`http://localhost:1337/api/company-messages?company=${company}&user=${user}`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany) return Swal.fire("Warning", "Select company first", "warning");
    if (!formData.message.trim()) return;

    try {
      const res = await Axios.post("http://localhost:1337/api/send-message", {
        sender: formData.name,
        email: formData.email,
        subject: "Chat Message", // backend expects subject schema, gracefully skipping in UI
        message: formData.message,
        company: selectedCompany.Company_name,
        type: "chat",
      });

      if (res.data.success) {
        setFormData({ ...formData, message: "" });
        fetchMessages(formData.name, selectedCompany.Company_name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAvatarColor = (name) => {
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="contact-basic-page">
      <section className="simple-contact-banner">
        <h1>Connect with Employers</h1>
        <p>Seamlessly chat with companies you have successfully applied to.</p>
      </section>

      <div className="container basic-contact-container">
        {/* LEFT SIDE */}
        <div className="company-selection-sidebar">
          <div className="user-direct-info">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>

          <h3>Your Applications</h3>
          {companies.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No applications found. Start applying!</p>
          ) : (
            <div className="comp-list-wrapper">
              {companies.map((comp) => (
                <div
                  key={comp.Company_id}
                  className={`basic-comp-card ${selectedCompany?.Company_id === comp.Company_id ? "active" : ""}`}
                  onClick={() => selectCompany(comp)}
                >
                  <div className="comp-avatar" style={{ backgroundColor: getAvatarColor(comp.Company_name) }}>
                    {comp.Company_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{comp.Company_name}</h4>
                    <p>{comp.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE CHAT */}
        <div className="message-interaction-area">
          {!selectedCompany ? (
            <div className="no-selection-msg">Select a company on the left to view your chat history.</div>
          ) : (
            <>
              <div className="chat-window-header">
                <h3>{selectedCompany.Company_name}</h3>
              </div>

              <div className="simple-chat-box">
                {messages.length === 0 && <span style={{textAlign: "center", color: '#94a3b8', margin: "auto"}}>Start a conversation by saying hi!</span>}
                {messages.map((m, i) => (
                  <React.Fragment key={i}>
                    <div className="user-text-bubble">{m.message}</div>
                    {m.reply && (
                      <div className="company-text-bubble">
                        <small>{selectedCompany.Company_name}</small>
                        {m.reply}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form className="basic-message-form" onSubmit={handleSubmit}>
                <textarea
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;