import { useEffect, useState } from "react";
import CreateGroupModal from "./group/create-group.modal.tsx";
import SidebarComponent from "./sidebar/sidebar.component.tsx";
import { UserDisplay, Group } from "../interfaces/group";
import { useNavigate } from "react-router-dom";
import "../style/MainPage.css";
import FileSearch from "./search/file-search.component.tsx";
import ApiManager from "../services/api-manager.tsx";

function MainPage() {
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const mockUsers: UserDisplay[] = [
    { userId: 101, username: "MockUser1" },
    { userId: 102, username: "MockUser2" },
  ];

  const mockGroups: Group[] = [
    {
      id: 201,
      name: "MockGroup1",
      owner: "MockUser1",
      members: [
        { userId: 101, username: "MockUser1" },
        { userId: 102, username: "MockUser2" },
      ],
    },
    {
      id: 202,
      name: "MockGroup2",
      owner: "MockUser2",
      members: [
        { userId: 102, username: "MockUser2" },
      ],
    },
  ];

  useEffect(() => {
    ApiManager.fetchUsers().then((res) => {
      setUsers([...mockUsers, ...res]);
    });
    ApiManager.fetchGroups().then((res) => {
      setGroups([...mockGroups, ...res]);
    });
  }, []);

  const handleCreateGroup = (name: string, members: UserDisplay[]) => {
    ApiManager.createGroup({ name, owner: "fanni", members }).then((res) => {
      setGroups([...groups, res]);
      setShowModal(false);
    });
  };

  return (
      <div className="main-container">
        <SidebarComponent title="Every User" users={users} />
        <div className="content-container">
          <FileSearch></FileSearch>
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
