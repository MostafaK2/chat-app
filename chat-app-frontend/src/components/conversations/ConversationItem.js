import classes from "./ConversationItem.module.css";
function ConversationItem(props) {

  return (
    <li className={classes.colorChange} onClick={() => props.callback(props.convId, props.conversation)}>
      <div className={classes.container}>
        <div className={classes.defualtGrpPic}></div>
        <div>
          <div className={classes.conversationName}>{props.convName}</div>
          <div className={classes.lastMessege}>last messege</div>
          <hr className={classes.line}></hr>
        </div>
      </div>
    </li>
  );
}

export default ConversationItem;
