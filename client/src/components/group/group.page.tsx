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
      ApiManager.fetchGroupDetails(parseInt(groupId)).then((res) => setGroup(res));
    }
  }, [groupId]);

  if (!group) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <SidebarComponent title = "Group Members" users={group.members} />
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
