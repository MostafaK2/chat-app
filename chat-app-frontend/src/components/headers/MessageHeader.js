import classes from "./MessageHeader.module.css";
import dots from "../images/SettingsLogo/3dots.png";
function MessageHeader(props) {
  return (
    <div className={classes.sdf}>
      {props.conversation ? (
        <div className={classes.container}>
          <h1>{props.conversation.conversationName}</h1>

          <button
            onClick={() => {props.openConversationSettings()}}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <img
              className={classes.animate}
              src={dots}
              alt="settings"
              height={40}
              width={40}
            />
          </button>
        </div>
      ) : (
        <h1>No Selected Conversation</h1>
      )}
    </div>
  );
}

export default MessageHeader;
