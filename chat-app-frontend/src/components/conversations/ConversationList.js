import ConversationItem from "./ConversationItem";
import ConvSearchHeader from "./ConvSearchHeader";

import classes from "./ConversationList.module.css";
import { useState } from "react";
import AddGroup from "./GroupRegistration/ConversationAdder";
import Backdrop from "../pages/login/backdrop";
import AddMember from "./GroupRegistration/AddMember";
import UserHeader from "../headers/UserHeader";
import useCurrentLocalState from "../../util/storage";
import PersonalSettings from "../settings/personal/PersonalSettings";
import Preferences from "../settings/personal/Preferences";

function ListOfConversations(props) {
  const[user] = useCurrentLocalState("", "user");

  const [groupAdderIsOpen, setGroupAdderIsOpen] = useState(false);
  const [memberAdderIsOpen, setMemberAdderIsOpen] = useState(false);
  const [personalSettingsIsOpen, setPersonalSettingsIsOpen] = useState(false);
  const [prefrencesIsOpen, setPrefrencesIsOpen] = useState(false);

  const [registrationId, setRegistrationId] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [currConvId, setCurrConvId] = useState(null);

  function openPrefrences() {
    setPrefrencesIsOpen(true);
  }

  function closePrefrences() {
    setPrefrencesIsOpen(false);
  }

  function openPersonalSettings() {
    setPersonalSettingsIsOpen(true);
  }

  function closePersonalSettings() {
    setPersonalSettingsIsOpen(false);
  }

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
    setCurrConvId(id);
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
      <UserHeader username={props.username} onClick={openPersonalSettings} />
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
              currConv={currConvId}
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

      {personalSettingsIsOpen && (
        <PersonalSettings
          close={closePersonalSettings}
          open={openPrefrences}
          closePref={closePrefrences}
        />
      )}

      {prefrencesIsOpen && <Preferences />}

      {groupAdderIsOpen && <Backdrop close={closeGroupRegistration} />}
      {personalSettingsIsOpen && <Backdrop close={closePersonalSettings} />}
      {prefrencesIsOpen && <Backdrop close={closePrefrences} />}
    </div>
  );
}

export default ListOfConversations;
