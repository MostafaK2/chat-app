import { useState } from "react";
import styles from "./ConversationSettings.module.css";

function ConversationSettings(props) {
  const [openShowUsers, setShowUser] = useState(false);
  const [changeGroupName, setChangeGroupName] = useState(false);

  function openUsers() {
    setShowUser(!openShowUsers);
  }

  function openChangeGroupName() {
    setChangeGroupName(!changeGroupName);
  }
  return (
    <div className={[styles["box"]]}>
      <div>
        Show Users
        <button onClick={openUsers}> Open Users</button>
      </div>
      <div>
        Change group name
        <button onClick={openChangeGroupName}> Open Users</button>
      </div>
      <div>
        Add Users
        <button>add users</button>
      </div>
    </div>
  );
}

export default ConversationSettings;
