import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FileNotification, useFileNotifications} from "./notification.context.tsx";

interface NotificationDisplayProps {
    title?: string;
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
                                                                     title = "Recent Notifications",
                                                                 }) => {
    const { notifications, removeNotification, downloadFile } = useFileNotifications();
    const navigate = useNavigate();

    const handleDownload = async (notification: FileNotification) => {
        if (notification.file) {
            await downloadFile(notification);
        }

        if (notification.groupId) {
            navigate(`/groups/${notification.groupId}`);
        }
    };

    if (notifications.length === 0) return null;

    return (
        <div className="notifications-section">
            <h2>{title}</h2>
            <div className="global-notifications-container">
                {notifications.map((notification) => (
                    <div key={notification.id} className="global-notification">
                        <div className="notification-content">
                            {notification.file ? (
                                <>
                                    <p>
                                        <strong>New File Received</strong>
                                        <br />
                                        Filename: {notification.fileName}
                                        <br />
                                        Sender: {notification.sender}
                                        <br />
                                        Received: {notification.receivedAt.toLocaleString()}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>New Message</strong>
                                        <br />
                                        Message: {notification.fileName}
                                        <br />
                                        Sender: {notification.sender}
                                        <br />
                                        Received: {notification.receivedAt.toLocaleString()}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="notification-actions">
                            {notification.file && (
                                <button onClick={() => handleDownload(notification)}>
                                    Download
                                </button>
                            )}
                            <button onClick={() => removeNotification(notification.id)}>
                                Dismiss
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationDisplay;