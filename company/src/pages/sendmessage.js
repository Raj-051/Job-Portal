import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./sendmessage.css";
import Swal from "sweetalert2";

function SendMessage() {
    const [interviews, setInterviews] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const company = JSON.parse(sessionStorage.getItem("mydata"));

    useEffect(() => {
        if (!company) return;

        Axios.get(`http://localhost:1337/api/getCompletedInterviews/${company.Company_id}`)
            .then((res) => {
                setInterviews(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [company?.Company_id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) {
            Swal.fire("Error", "Message cannot be empty", "error");
            return;
        }

        Axios.post("http://localhost:1337/api/sendMessage", {
            sender_id: company.Company_id,
            receiver_id: selectedUser.User_id,
            message: message,
            sender_type: "company"
        })
            .then((res) => {
                Swal.fire("Success", "Message Sent Successfully!", "success");
                setMessage("");
                setSelectedUser(null);
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Failed to send message", "error");
            });
    };

    const handleQuickAction = (user, actionType) => {
        let predefinedMessage = "";
        if (actionType === "shortlist") {
            predefinedMessage = `Congratulations ${user.Name}! You have been shortlisted for the ${user.job_title} role. We will contact you soon with further details.`;
        } else if (actionType === "reject") {
            predefinedMessage = `Dear ${user.Name}, thank you for your interest in the ${user.job_title} role. Unfortunately, we will not be moving forward with your application at this time. We wish you the best in your job search.`;
        }

        Axios.post("http://localhost:1337/api/sendMessage", {
            sender_id: company.Company_id,
            receiver_id: user.User_id,
            message: predefinedMessage,
            sender_type: "company"
        })
            .then((res) => {
                Swal.fire("Success", `${actionType === 'shortlist' ? 'Shortlist' : 'Rejection'} message sent automatically!`, "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Failed to send message", "error");
            });
    };

    return (
        <div className="send-message-page">
            <div className="send-message-container">
                <h2 className="title-premium">Scheduled & Completed Interviews</h2>
                <p className="subtitle-premium">Select a candidate from your scheduled interviews to send a direct message.</p>

                {loading ? (
                    <div className="loading-state">Loading candidates...</div>
                ) : (
                    <div className="candidates-grid">
                        {interviews.length > 0 ? (
                            interviews.map((item) => (
                                <div key={item.Interview_id} className="candidate-card-glass">
                                    <div className="card-header">
                                        <div className="avatar-placeholder">
                                            {item.Name ? item.Name.charAt(0).toUpperCase() : "?"}
                                        </div>
                                        <div>
                                            <h3>{item.Name}</h3>
                                            <p className="job-role">{item.job_title}</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Email:</strong> {item.email}</p>
                                        <p><strong>Status:</strong> <span className={item.status === 'Completed' ? "badge-completed" : "badge-scheduled"}>{item.status || "Scheduled"}</span></p>
                                    </div>
                                    <div className="card-actions-grid">
                                        <button
                                            className="btn-shortlist"
                                            onClick={() => handleQuickAction(item, 'shortlist')}
                                        >
                                            <i className="fa-solid fa-check"></i> Shortlist
                                        </button>
                                        <button
                                            className="btn-reject"
                                            onClick={() => handleQuickAction(item, 'reject')}
                                        >
                                            <i className="fa-solid fa-xmark"></i> Reject
                                        </button>
                                        <button
                                            className="btn-send-message"
                                            onClick={() => setSelectedUser(item)}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i> Custom Message
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">📂</div>
                                <p>No scheduled interviews found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Message Modal */}
            {selectedUser && (
                <div className="modal-backdrop-blur">
                    <div className="message-modal-glass">
                        <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
                        <h3>Send Message to {selectedUser.Name}</h3>
                        <p className="modal-subtitle">Regarding: {selectedUser.job_title}</p>

                        <form onSubmit={handleSendMessage}>
                            <textarea
                                placeholder="Type your message or notification details here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="premium-textarea"
                            ></textarea>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setSelectedUser(null)}>Cancel</button>
                                <button type="submit" className="btn-submit">
                                    Send <i className="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SendMessage;
