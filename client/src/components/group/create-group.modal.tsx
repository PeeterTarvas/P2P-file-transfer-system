import {useState} from "react";
import "../../style/CreateGroupModal.css";

interface CreateGroupModalProps {
    onSave: (name: string, members: string[]) => void;
    onClose: () => void;
}

function CreateGroupModal({onSave, onClose}: CreateGroupModalProps) {
    const [name, setName] = useState("");
    const [members, setMembers] = useState<string[]>([]);

    const handleSave = () => {
        onSave(name, members);
        setName("");
        setMembers([]);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Create Group</h2>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Member names (comma-separated)"
                    onChange={(e) =>
                        setMembers(
                            e.target.value.split(",").map((memberName) => memberName.trim())
                        )
                    }
                />
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGroupModal;
