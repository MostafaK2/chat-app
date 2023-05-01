import MessegeItem from "./MessegeItem";
import MessageHeader from "../headers/MessageHeader";
import ConversationSettings from "../settings/conversational/ConversationSettings";
import Backdrop from "../pages/login/backdrop";

import classes from "./MessegeList.module.css";
import { useState, useEffect, useRef, useAnimatedRef } from "react";

import { over } from "stompjs";
import SockJS from "sockjs-client";
import useCurrentLocalState from "../../util/storage";
var stompClient = null;
// Passed in data from the outside, changes for each users

function MessegeList(props) {
  // assign a value and set to var if it breaks
  const [user] = useCurrentLocalState("", "user");
  const [groupUsers, setGroupUsers] = useState(null);
  const [messege, setMessege] = useState("");
  const [connected, setConnected] = useState(false);
  const [currConvId, setCurrConvId] = useState(null);
  const [publicMessages, setPublicMessages] = useState([]);

  const [conversationSettingsIsOpen, setConversationSettingsIsOpen] =
    useState(false);

  function openConversationSettings() {
    setConversationSettingsIsOpen(true);
  }

  function closeConversationSettings() {
    setConversationSettingsIsOpen(false);
  }

  // scrolling code
  const ref = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        console.log(target);
        target.scroll({ top: target.scrollHeight, behaivor: "smooth" });
      });
    }
  }, []);
  // end scrolling code

  useEffect(() => {
    if (currConvId) {
      const userByConvId = "api/v1/conversation/" + currConvId + "/users";
      fetch(userByConvId, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          var dict = {};
          data.map((item) => {
            dict[item.id] = { fname: item.fname, lname: item.lname };
            return null;
          });
          setGroupUsers(dict);
        });
    }
  }, [currConvId]);

  // connects to the sock js client
  async function connect() {
    setConnected(true);
    var socket = new SockJS("/ws");

    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
    console.log("stomp client", stompClient);
  }

  function onConnected() {
    stompClient.subscribe(
      "/topic/" + props.convId + "/group",
      onRecievedMessage
    );
  }

  function onError(err) {
    console.log(err);
  }

  async function disconnect() {
    if (stompClient) {
      stompClient.disconnect(function (frame) {
        console.log("StompClient successfully  disconnected");
      });
      setPublicMessages([]);
      setConnected(false);
    }
  }

  function onRecievedMessage(payload) {
    console.log(payload);
    setPublicMessages((current) => [...current, JSON.parse(payload.body)]);
  }

  function sendMessages() {
    if (messege.length === 0) {
      return;
    }
    const temp = JSON.parse(user);
    if (stompClient) {
      var chatMessage = {
        fromuser: temp.id,
        messegeTexts: messege,
        conversationId: props.convId,
      };
      stompClient.send("/app/group-message", {}, JSON.stringify(chatMessage));
    }
    setMessege("");
  }

  function onConversationClicked() {
    // add else if(props.convId not equal to the previous one and is not null then disconnect and set messege state to empty and reconnect)
    if (props.convId != null) {
      connect();
      setCurrConvId(props.convId);
    } else {
      <div>not connected</div>;
    }
  }

  function getUserDetails(id) {
    if (groupUsers) {
      return groupUsers[id];
    }
  }

  if (props.convId !== currConvId && currConvId !== null) {
    disconnect();
    setCurrConvId(props.convId);
  }

  function display() {
    var id = 0;
    const curr_user = JSON.parse(user);
    return publicMessages.map((item) => {
      // find an actual fix from the backend by sending the id generated in the chat controller
      id -= 1;
      return (
        <MessegeItem
          key={id}
          msg_id={item.id}
          text={item.messegeTexts}
          time={item.sentDatetime}
          user_id={item.fromuser}
          curr_user_id={curr_user.id}
          user_details={getUserDetails(item.fromuser)}
        />
      );
    });
  }

  return (
    <div className={classes.test}>
      <MessageHeader
        conversation={props.conversation}
        openConversationSettings={openConversationSettings}
      />
      {console.log("the conversation Id ", currConvId)}
      <div ref={ref} className={classes.itemconfiguration}>
        <ul className={classes.listOptions}>
          {props.msgData.map((msg_meta) => {
            const curr_user = JSON.parse(user);
            return (
              <MessegeItem
                key={msg_meta.id}
                msg_id={msg_meta.id}
                text={msg_meta.messegeTexts}
                time={msg_meta.sentDatetime}
                user_id={msg_meta.fromuser}
                curr_user_id={curr_user.id}
                user_details={getUserDetails(msg_meta.fromuser)}
              />
            );
          })}
          {connected ? display() : console.log(-1)}
        </ul>
        {!connected ? onConversationClicked() : console.log("connected")}
      </div>

      <div className={classes.stickToBottom}>
        <input
          type="text"
          placeholder="Send Messege"
          id="messege"
          onChange={(elem) => setMessege(elem.target.value)}
          className={classes.sendMessegeBox}
          value={messege}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessages();
            }
          }}
        />

        <button className={classes.button} onClick={sendMessages}>
          .
        </button>
      </div>

      {conversationSettingsIsOpen && <ConversationSettings />}
      {conversationSettingsIsOpen && (
        <Backdrop close={closeConversationSettings} />
      )}
    </div>
  );
}

export default MessegeList;
