import { UserDisplay } from "../../interfaces/group.tsx";

interface SidebarProps {
    title: string;
    users: UserDisplay[];
}

function SidebarComponent({ title, users }: SidebarProps) {
  return (
    <div className="sidebar">
      <h2>{title}</h2>
      {users.map((user) => (
          <div key={user.userId}>
              <div>Username: {user.username}</div>
          </div>
      ))}
    </div>
  );
}

export default SidebarComponent;
