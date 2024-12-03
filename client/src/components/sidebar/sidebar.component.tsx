import { useEffect, useState } from "react";
import { UserDisplay } from "../../interfaces/group.tsx";
import ApiManager from "../../services/api-manager.tsx";
import "../../index.css";

interface SidebarProps {
    title: string;
    users: UserDisplay[];
}

function SidebarComponent({ title, users }: SidebarProps) {
    const [currentUsers, setUsers] = useState<UserDisplay[]>(users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await ApiManager.fetchUsers();
                setUsers(res);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // Initial fetch
        fetchUsers();

        // Polling interval
        const intervalId = setInterval(() => {
            fetchUsers();
        }, 5000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="sidebar">
            <div>Your username: {sessionStorage.getItem("username")}</div>
            <h2>{title}</h2>
            {currentUsers.map((user) => (
                <div key={user.userId} className="user">
                    <span className="username">{user.username}</span>
                    {user.isOnline && <span className="status-dot"></span>}
                </div>
            ))}
        </div>
    );
}

export default SidebarComponent;
