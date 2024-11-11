import React, { useState } from "react";
import ApiManager from "../../services/api-manager";

interface InviteUsersModalProps {
  groupId: number;
  onClose: () => void;
  onInviteSuccess: () => void;
}

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({ groupId, onClose, onInviteSuccess }) => {
  const [usernames, setUsernames] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInviteUsers = async () => {
    setLoading(true);
    setError(""); // Reset error

    // Split the input by commas to get the usernames
    const usernameList = usernames.split(",").map(username => username.trim());

    try {
      // Iterate through the usernames and call the API to add each user to the group
      for (const username of usernameList) {
        if (username) {
          await ApiManager.addUserToGroup(groupId, username);
        }
      }
      onInviteSuccess(); // Notify success (e.g., refresh group members)
      onClose(); // Close the modal
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
