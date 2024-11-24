import {useEffect, useState} from "react";
import CreateGroupModal from "./group/create-group.modal.tsx";
import SidebarComponent from "./sidebar/sidebar.component.tsx";
import {UserDisplay, Group} from "../interfaces/group";
import {useNavigate} from "react-router-dom";
import "../style/MainPage.css";
import Search from "./search/search.component.tsx";
import ApiManager from "../services/api-manager.tsx";
import {getUsernameFromSession} from "../utils/session-storage.tsx";
import PeerComponent from "./peer/peer.component.tsx";

function MainPage() {
    const [users, setUsers] = useState<UserDisplay[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [currentPeerId, setCurrentPeerId] = useState<string | null>(null);
    const [memberPeerIds, setMemberPeerIds] = useState<Set<string>>(new Set());

    const mockUsers: UserDisplay[] = [
        {userId: 101, username: "MockUser1", peerId: "dcjnckjsndc", isOnline: true},
        {userId: 102, username: "MockUser2", peerId: "dcjnckjsndj", isOnline: true},
    ];

    const mockGroups: Group[] = [
        {
            id: 201,
            name: "MockGroup1",
            owner: "MockUser1",
            members: [
                {userId: 101, username: "MockUser1", peerId: "dcjnckjsndj", isOnline: true},
                {userId: 102, username: "MockUser2", peerId: "dcjnckjsndj", isOnline: true},
            ],
        },
        {
            id: 202,
            name: "MockGroup2",
            owner: "MockUser2",
            members: [
                {userId: 102, username: "MockUser2", peerId: "dcjnckjsndj", isOnline: true},
            ],
        },
    ];

    useEffect(() => {
        ApiManager.fetchUsers().then((res) => {
            setUsers([...mockUsers, ...res]);
        });
        const member: string = getUsernameFromSession();
        if (!member) {
            navigate("/");
        }
        ApiManager.fetchUserGroups(member).then((res) => {
            setGroups([...mockGroups, ...res])
        })
        setCurrentPeerId(sessionStorage.getItem('peerId'))
    }, []);

    const handleCreateGroup = (name: string, members: string[]) => {
        const owner: string = getUsernameFromSession();
        ApiManager.createGroup({name, owner: owner, members}).then((res) => {
            setGroups([...groups, res]);
            setShowModal(false);
        });
    };

    const handlelogout = async () => {
        const username: string = getUsernameFromSession();
        if (username) {
            try {
                const isOnline = false;
                const response = await ApiManager.updateOnlineStatusByUsername(username, isOnline);
                if (response.status === 200) {
                    console.log("User set to offline successfully.");
                } else {
                    console.error("Error: Failed to set user offline.");
                    throw new Error("Failed to set user offline");
                }
            } catch (error) {
                console.error("Failed to set user offline:", error);
            }
        }
        sessionStorage.clear();
        navigate("/");
    };

    const searchOnClick = async (name: string, username: string) => {
        const owner: string = getUsernameFromSession();
        const group: Group = await ApiManager.createGroup({name, owner: owner, members: [username]});
        navigate(`/groups/${group.id}`)
    };


    useEffect(() => {
        const member: string = getUsernameFromSession();
        if (!member) {
            navigate("/");
        }
        ApiManager.fetchUserGroups(member).then((res) => {
            setGroups([...mockGroups, ...res])
        })
    }, []);

    const getAllGroupMemberPeerIds = async () => {
        const allMemberPeerIds: Set<string> = new Set();

        for (const group of groups) {
            const res = await ApiManager.fetchGroupDetails(group.id);

            if (!res) {
                continue;
            }
            res.members.forEach((member: { peerId: string }) => {
                if (member.peerId !== currentPeerId) {
                    allMemberPeerIds.add(member.peerId);
                }
            });
        }

        return allMemberPeerIds;
    };

    useEffect(() => {
        getAllGroupMemberPeerIds().then((peerIds) => {
            setMemberPeerIds(peerIds);
        });
    }, [groups]);


    return (
        <div className="main-container">
            <SidebarComponent title="Every User" users={users}/>
            <div className="content-container">
                <Search onSelect={searchOnClick}></Search>
                <header className="header">
                    <h1>Peer to peer file sharing</h1>
                    <button
                        className="create-group-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Create Group
                    </button>
                    <button
                        className="logout-btn"
                        onClick={handlelogout}
                    >
                        Logout
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
                <PeerComponent
                    existingPeerId={currentPeerId}
                    receiversPeerIds={Array.from(memberPeerIds)}
                    groupId={undefined}
                    renderComponent={false}
                />
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