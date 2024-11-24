import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Group} from "../../interfaces/group.tsx";
import SidebarComponent from "../sidebar/sidebar.component.tsx";
import ApiManager from "../../services/api-manager.tsx";
import {getUsernameFromSession} from "../../utils/session-storage.tsx";
import {useNavigate} from 'react-router-dom';
import InviteUsersModal from "./invite-user-modal.tsx";
import PeerComponent from "../../components/peer/peer.component.tsx";

function GroupPage() {
    const {groupId} = useParams<{ groupId: string }>();
    const [group, setGroup] = useState<Group | null>(null);
    const currentUser: string = getUsernameFromSession();
    const [currentPeerId, setCurrentPeerId] = useState<string | null>(null);
    const [receiversPeerIds, setReceiversPeerIds] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);

    useEffect(() => {
        if (groupId) {
            ApiManager.fetchGroupDetails(parseInt(groupId)).then((res) => {
                setGroup(res);
            });
        }
    }, [groupId]);

    useEffect(() => {
        if (group) {
            handleSearch();
        }
    }, [group]);

    if (!group) return <div>Loading...</div>;

    const openInviteModal = () => setInviteModalOpen(true);
    const closeInviteModal = () => setInviteModalOpen(false);

    const handleInviteSuccess = () => {
        if (groupId) {
            ApiManager.fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res));
            handleSearch();
            location.reload();
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

    const handleSearch = () => {
        const member = group?.members.find((member) => member.username === currentUser);


        if (member) {
            setCurrentPeerId(member.peerId);

            const otherPeerIds = group.members
                .filter((m) => m.peerId !== member.peerId)
                .map((m) => m.peerId);
            setReceiversPeerIds(otherPeerIds);
        } else {
            setCurrentPeerId(null);
            setReceiversPeerIds([]);
        }
    };


    return (
        <div className="main-container">
            <SidebarComponent title="Group Members" users={group.members}/>
            <div className="content-container">
                <header className="header">
                    <h2>
                        Group name: {group.name}, Group owner: {group.owner}
                    </h2>
                    <div className="button-group">
                        <button onClick={openInviteModal}>Invite Users</button>
                        <button onClick={handleLeaveGroup} disabled={currentUser === group.owner}>
                            Leave Group
                        </button>
                        <button onClick={handleDeleteGroup} disabled={currentUser !== group.owner}>
                            Delete Group
                        </button>
                    </div>
                    {isInviteModalOpen && (
                        <InviteUsersModal
                            groupId={parseInt(groupId as string)}
                            onClose={closeInviteModal}
                            onInviteSuccess={handleInviteSuccess}
                        />
                    )}
                </header>

                <div className="peer-component-container">
                    <PeerComponent
                        existingPeerId={currentPeerId}
                        receiversPeerIds={receiversPeerIds}
                        groupId={groupId as string}
                    />
                </div>
            </div>
        </div>
    );
}

export default GroupPage;