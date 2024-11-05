import { UserDisplay } from "../interfaces/group";

interface SidebarProps {
    title: string;
    users: UserDisplay[];
}

function Sidebar({ title, users }: SidebarProps) {
  return (
    <div className="sidebar">
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.userId}>{user.username}</div>
      ))}
    </div>
  );
}

export default Sidebar;
