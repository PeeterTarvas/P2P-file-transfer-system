import React, {useState} from "react";
import ApiManager from "../../services/api-manager";

interface InviteUsersModalProps {
    groupId: number;
    onClose: () => void;
    onInviteSuccess: () => void;
}

const addUserToGroup = async (groupId: number, username: string) => {
    await ApiManager.addUserToGroup(groupId, username);
}

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({groupId, onClose, onInviteSuccess}) => {
    const [usernames, setUsernames] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleInviteUsers = async () => {
        setLoading(true);
        setError("");

        const usernameList = usernames.split(",").map(username => username.trim());

        try {
            for (const username of usernameList) {
                if (username) {
                    await addUserToGroup(groupId, username);
                }
            }
            onInviteSuccess();
            onClose();
        } catch (error) {
            setError("Failed to invite some users.");
            console.error("Invite Users Error: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Invite Users</h2>
                <textarea
                    value={usernames}
                    onChange={(e) => setUsernames(e.target.value)}
                    placeholder="Enter usernames, comma-separated"
                    rows={4}
                />
                {error && <div className="error">{error}</div>}
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleInviteUsers} disabled={loading}>
                        {loading ? "Inviting..." : "Invite Users"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteUsersModal;