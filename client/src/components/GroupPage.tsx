import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroupDetails } from "../services/GroupApi";
import { Group } from "../interfaces/group";
import Sidebar from "./Sidebar";

function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res.data));
    }
  }, [groupId]);

  if (!group) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <Sidebar title = "Group Members" users={group.members} />
      <div className="content-container">
        <header className="header">
          <h2>
            Group name: {group.name}, Group owner: {group.owner}
          </h2>
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
