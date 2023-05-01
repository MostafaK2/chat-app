import ConversationItem from "./ConversationItem";
import ConvSearchHeader from "./ConvSearchHeader";

import classes from "./ConversationList.module.css";
import { useState, useEffect } from "react";
import AddGroup from "./GroupRegistration/ConversationAdder";
import Backdrop from "../pages/login/backdrop";
import AddMember from "./GroupRegistration/AddMember";
import UserHeader from "../headers/UserHeader";
import useCurrentLocalState from "../../util/storage";
import PersonalSettings from "../settings/personal/PersonalSettings";
import Preferences from "../settings/personal/Preferences";
import ContactMe from "../pages/ContactMe";

function ListOfConversations(props) {
  const [user] = useCurrentLocalState("", "user");
  const [userMeta, setUserMeta] = useState(JSON.parse(user));

  const [groupAdderIsOpen, setGroupAdderIsOpen] = useState(false);
  const [memberAdderIsOpen, setMemberAdderIsOpen] = useState(false);
  const [personalSettingsIsOpen, setPersonalSettingsIsOpen] = useState(false);
  const [prefrencesIsOpen, setPrefrencesIsOpen] = useState(false);
  const [contactMeIsOpen, setContactMeIsOpen] = useState(false);
  
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

  function openContactMe() {
    setContactMeIsOpen(true);
  }

  function closeContactMe() {
    setContactMeIsOpen(false);
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

  function capitalizeName() {
    var temp = userMeta;
    const lname = temp.lname.charAt(0).toUpperCase() + temp.lname.slice(1);
    const fname = temp.fname.charAt(0).toUpperCase() + temp.fname.slice(1);
    return fname + " " + lname;
  }
  const [username, setUsername] = useState(capitalizeName());
  useEffect(() => {
    setUsername(capitalizeName());
  }, [userMeta]);

  return (
    <div className={classes.container}>
      <UserHeader username={username} onClick={openPersonalSettings} />
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
      {console.log("props in Convo List:  " + props.fetchString)}

      {memberAdderIsOpen && (
        <AddMember
          close={closeMemberAdder}
          closeGroup={closeGroupRegistration}
          convId={registrationId}
          fetchString={props.fetchString}
          setConversations={props.setConversations}
          setSwitchWebsock={props.setSwitchWebsock}
        />
      )}

      {personalSettingsIsOpen && (
        <PersonalSettings
          close={closePersonalSettings}
          open={openPrefrences}
          closePref={closePrefrences}
          openContactMe={openContactMe}
        />
      )}

      {prefrencesIsOpen && (
        <Preferences username={username} setUserMeta={setUserMeta} />
      )}
      {contactMeIsOpen && <ContactMe />}
      

      {groupAdderIsOpen && <Backdrop close={closeGroupRegistration} />}
      {personalSettingsIsOpen && <Backdrop close={closePersonalSettings} />}
      {prefrencesIsOpen && <Backdrop close={closePrefrences} />}
      {contactMeIsOpen && <Backdrop close={closeContactMe} />}
      
    </div>
  );
}

export default ListOfConversations;
