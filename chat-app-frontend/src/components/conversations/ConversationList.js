import ConversationItem from "./ConversationItem";
import ConvSearchHeader from "./ConvSearchHeader";

import classes from "./ConversationList.module.css";
import { useState } from "react";
import AddGroup from "./GroupRegistration/ConversationAdder";
import Backdrop from "../pages/login/backdrop";
import AddMember from "./GroupRegistration/AddMember";

function ListOfConversations(props) {
  const [groupAdderIsOpen, setGroupAdderIsOpen] = useState(false);
  const [memberAdderIsOpen, setMemberAdderIsOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  function openMemberAdder(id) {
    setRegistrationId(id);
    setMemberAdderIsOpen(true);
  }

  function closeMemberAdder() {
    setMemberAdderIsOpen(false);
  }

  function openGroupRegistration() {
    setGroupAdderIsOpen(true);
  }

  function closeGroupRegistration() {
    setGroupAdderIsOpen(false);
  }

  function fetchMesseges(id, conversation) {
    const url = "api/v1/conversation/" + id + "/messeges";
    const msgData = null;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        props.openMesseges(data, id, conversation);
      });
  }

  return (
    <div className={classes.container}>
      <div>
        <h2>{props.username}</h2>
      </div>
      <div>
        <input
          className={classes.searchGroup}
          placeholder="search group"
        ></input>
        <button className={classes.plusbutton} onClick={openGroupRegistration}>
          .
        </button>
      </div>
      <div className={classes.itemconfiguration}>
        <ul className={classes.listOptions}>
          {props.convData.map((item) => (
            <ConversationItem
              callback={fetchMesseges}
              convId={item.id}
              convName={item.conversationName}
              conversation={item}
            />
          ))}
        </ul>
      </div>

      {groupAdderIsOpen && (
        <AddGroup close={closeGroupRegistration} open={openMemberAdder} />
      )}
      {memberAdderIsOpen && (
        <AddMember
          close={closeMemberAdder}
          closeGroup={closeGroupRegistration}
          convId={registrationId}
        />
      )}
      {groupAdderIsOpen && <Backdrop close={closeGroupRegistration} />}
    </div>
  );
}

export default ListOfConversations;
