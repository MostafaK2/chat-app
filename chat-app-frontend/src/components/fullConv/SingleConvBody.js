import ListOfConversations from "../conversations/ConversationList";
import MessegeList from "../messegeComponents/MessegeList";
import convHeader from "../conversations/ConvSearchHeader";

import classes from "./co.module.css";
import useCurrentLocalState from "../../util/storage";
import { useState } from "react";

function SingleConvBody() {
  var [user, setUser] = useCurrentLocalState("", "user");
  user = JSON.parse(user);
  const [conversations, setConversations] = useState([]);

  const [msgData, setMsgData] = useState([]);
  // stored as a dictionary id -> fname, lname
  const [groupUsers, setGroupUsers] = useState(null);

  // try
  const [clickedConversationId, setClickedConversationId] = useState(null);
  const [conv, setConv] = useState(null);
  const [switchWebsock, setSwitchWebsock] = useState(false);
  //end try

  var fetchString = "api/v1/user/" + user.id + "/conversations";
  
  if (!switchWebsock) {
    fetch(fetchString, {
      headers: {
        "Content-Type": "application/json",
        // 'Accept': 'application/json'
      },
      method: "GET",
    })
      .then((response) => {
        const status = response.status;
        if (status === 401 || status === 403) {
          console.log("unauthorized");
        } else if (status === 200) {
          return response.json();
        } else {
          console.log("something went wrong");
        }
      })
      .then((data) => {
        setConversations(data);
        setSwitchWebsock(true);
      });
  }

  console.log(groupUsers);

  function handleClick(data, id, conversation) {
    setConv(conversation);
    setClickedConversationId(id);
    setMsgData(data);
  }

  // capitalizes the first and last name of the user and returns
  function capitalizeName() {
    const lname = user.lname.charAt(0).toUpperCase() + user.lname.slice(1);
    const fname = user.fname.charAt(0).toUpperCase() + user.fname.slice(1);
    return fname + " " + lname;
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.gridContainer}>
        <ListOfConversations
          setGroupUsers={setGroupUsers}
          openMesseges={handleClick}
          convData={conversations}
          username={capitalizeName()}
        />
        {console.log(msgData)}
        <MessegeList
          msgData={msgData}
          convId={clickedConversationId}
          conversation={conv}
        />
      </div>
    </div>
  );
}
export default SingleConvBody;
