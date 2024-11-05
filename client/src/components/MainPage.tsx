import { useEffect, useState } from "react";
import { fetchUsers, fetchGroups, createGroup } from "../services/GroupApi";
import CreateGroupModal from "./CreateGroupModal";
import Sidebar from "./Sidebar";
import { UserDisplay, Group } from "../interfaces/group";
import { useNavigate } from "react-router-dom";
import "../style/MainPage.css";

function MainPage() {
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
    fetchGroups().then((res) => setGroups(res.data));
  }, []);

  const handleCreateGroup = (name: string, members: string[]) => {
    createGroup({ name, owner: "fanni", members }).then((res) => {
      setGroups([...groups, res.data]);
      setShowModal(false);
    });
  };

  return (
    <div className="main-container">
      <Sidebar title="Every User" users={users} />
      <div className="content-container">
        <header className="header">
          <h1>Peer to peer filesharing</h1>
          <button
            className="create-group-btn"
            onClick={() => setShowModal(true)}
          >
            Create Group
          </button>
        </header>
        <div className="group-list">
          {groups.map((group) => (
            <button
              key={group.id}
              className="group-button"
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
      {showModal && (
        <CreateGroupModal
          onSave={handleCreateGroup}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MainPage;
