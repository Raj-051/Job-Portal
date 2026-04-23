import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  useEffect(() => {
    if (!user) return;

    Axios.get(`http://localhost:1337/api/getNotifications/${user.User_id}`)
      .then((res) => {
        setNotifications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="notification-page">
      <div className="notification-container">
        <div className="notification-header">
          <h2 className="title-gradient">Your Notifications</h2>
          <span className="badge-count">
            {notifications.length} {notifications.length === 1 ? 'Notification' : 'Notifications'}
          </span>
        </div>

        {loading ? (
          <div className="loading-pulse">
            <div className="pulse-circle"></div>
            <p>Loading your notifications...</p>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div key={item.id} className="notification-card glass-effect">
                  <div className="notification-icon">
                    <i className="fa-solid fa-building"></i>
                  </div>
                  <div className="notification-content">
                    <div className="notification-meta">
                      <h4 className="company-name">{item.Company_name || "Company"}</h4>
                      <span className="time-stamp">{formatDate(item.created_at)}</span>
                    </div>
                    <p className="message-text">{item.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-notifications">
                <div className="empty-icon-wrapper">
                  <i className="fa-regular fa-bell-slash"></i>
                </div>
                <h3>No Notifications Yet</h3>
                <p>When companies send you messages after interviews, they will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
