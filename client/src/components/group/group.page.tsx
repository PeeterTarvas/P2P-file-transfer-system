import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Group } from "../../interfaces/group.tsx";
import SidebarComponent from "../sidebar/sidebar.component.tsx";
import ApiManager from "../../services/api-manager.tsx";

function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res.data));
    }
  }, [groupId]);

  if (!group) return <div>Loading...</div>;

  const handleInviteUsers = () => {
    // Logic for inviting users (e.g., open a modal)
    console.log("Invite Users button clicked");
  };

  const handleLeaveGroup = () => {
    // Logic for leaving the group
    console.log("Leave Group button clicked");
  };

  const handleDeleteGroup = () => {
    // Logic for deleting the group
    console.log("Delete Group button clicked");
  };

  return (
    <div className="main-container">
      <SidebarComponent title = "Group Members" users={group.members} />
      <div className="content-container">
        <header className="header">
          <h2>
            Group name: {group.name}, Group owner: {group.owner}
          </h2>
          <div className="button-group">
            <button onClick={handleInviteUsers}>Invite Users</button>
            <button onClick={handleLeaveGroup}>Leave Group</button>
            <button onClick={handleDeleteGroup}>Delete Group</button>
          </div>
        </header>
        <div>
          <h3>Files</h3>
          {/* Placeholder for file listing */}
        </div>
        <button>Add file</button>
      </div>
    </div>
  );
}

export default GroupPage;
