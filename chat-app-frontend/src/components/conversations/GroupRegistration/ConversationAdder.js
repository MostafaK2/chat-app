import { useState, useEffect } from "react";
import AddMember from "./AddMember";

function AddGroup(props) {
  function cancelHandler() {
    props.close();
  }

  // f2 (saves the group and passes in the conversation id back to conversationList which 
  // is then used in addMembers to add users to a specific conversations.)
  function saveGroup() {
    var id = -1;
    if(groupName.length == 0){
      return
    }
    const data = {
      conversationName: groupName,
    };

    fetch("api/v1/conversations", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          id = data["id"];
          props.open(id);
        } else {
          console.log("no data");
        }
      }); 
  }
  // f2

  const [groupName, setGroupName] = useState("");

  return (
    <div className="registration">
      <h1>Add Group</h1>
      <div>
        <input
          placeholder="Set Group Name"
          className="input"
          type="group-name"
          id="groupName"
          onChange={(elem) => setGroupName(elem.target.value)}
        ></input>
      </div>
      <div>
        <button className = "btn" onClick={cancelHandler}>cancel</button>
        <button className = "btn" onClick={saveGroup}>Add Group</button>
      </div>
    </div>
  );
}

export default AddGroup;
