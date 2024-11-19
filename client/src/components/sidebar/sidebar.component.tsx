import { UserDisplay } from "../../interfaces/group.tsx";
import "../../index.css";

interface SidebarProps {
    title: string;
    users: UserDisplay[];
}

function SidebarComponent({ title, users }: SidebarProps) {
    return (
        <div className="sidebar">
            <h2>{title}</h2>
            {users.map((user) => (
                <div key={user.userId} className="user">
                    <span className="username">{user.username}</span>
                    {user.isOnline && <span className="status-dot"></span>}
                </div>
            ))}
        </div>
    );
}


export default SidebarComponent;
