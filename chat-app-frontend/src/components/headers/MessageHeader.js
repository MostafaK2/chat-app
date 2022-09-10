import classes from "./MessageHeader.module.css";

function MessageHeader(props) {
  return (
    <div className={classes.sdf}>
      {props.conversation ? (
        <h1>{props.conversation.conversationName}</h1>
      ) : (
        <h1>No Selected Conversation</h1>
      )}
    </div>
  );
}

export default MessageHeader;
