import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Group } from "../../interfaces/group.tsx";
import SidebarComponent from "../sidebar/sidebar.component.tsx";
import ApiManager from "../../services/api-manager.tsx";
import { getUsernameFromSession } from "../../utils/session-storage.tsx";
import { useNavigate } from 'react-router-dom';
import InviteUsersModal from "./invite-user-modal.tsx";


function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const currentUser: string = getUsernameFromSession();
  const navigate = useNavigate();
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  useEffect(() => {
    if (groupId) {
      ApiManager.fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res));
    }
  }, [groupId]);

  if (!group) return <div>Loading...</div>;

  const openInviteModal = () => setInviteModalOpen(true);
  const closeInviteModal = () => setInviteModalOpen(false);

  const handleInviteSuccess = () => {
    //Refresh the group details or update state
    if (groupId) {
      ApiManager.fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res));
    }
  };



  const handleLeaveGroup = () => {
    const isConfirmed = window.confirm("Are you sure you want to leave this group?");
    if (isConfirmed && groupId) {
      ApiManager.removeUserFromGroup(parseInt(groupId), currentUser)
        .then(() => {
          console.log("User removed successfully");
           navigate("/main"); 
        })
        .catch((error) => {
          console.error("Failed to remove user", error);
        });
    }
  };

  const handleDeleteGroup = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this group?");
    if (isConfirmed && groupId) {
      ApiManager.deleteGroup(parseInt(groupId))
        .then(() => {
          console.log("Group deleted successfully");
           navigate("/main"); 
        })
        .catch((error) => {
          console.error("Failed to delete the group", error);
        });
    }
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
            <button onClick={openInviteModal}>Invite Users</button>
            <button onClick={handleLeaveGroup} disabled={currentUser === group.owner}>Leave Group</button>
            <button onClick={handleDeleteGroup} disabled={currentUser !== group.owner}>Delete Group</button>
          </div>
          {/* Render Invite Users Modal */}
        {isInviteModalOpen && (
          <InviteUsersModal 
            groupId={parseInt(groupId)} 
            onClose={closeInviteModal} 
            onInviteSuccess={handleInviteSuccess} 
          />
        )}
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
