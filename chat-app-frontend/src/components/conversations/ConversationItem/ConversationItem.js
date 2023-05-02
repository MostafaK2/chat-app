import classes from "./ConversationItem.module.css";
import { useState } from "react";

function ConversationItem(props) {
  const [clickedCoversation, setClickedCoversation] = useState(0)

  
  function changeColor(){
    console.log("conversation id",props.convId, "clicked conversattion",clickedCoversation);
    if(clickedCoversation === props.currConv){
      return classes.colorChangeAlt;
    }
    return classes.colorChange;
  }

  return (
    <li
      className={changeColor()}
      onClick={() => {
        setClickedCoversation(props.convId)
        return props.callback(props.convId, props.conversation);
      }}
    >
      <div className={classes.container}>
        <div className={classes.defualtGrpPic}></div>
        <div>
          <div className={classes.conversationName}>{props.convName}</div>
          <div className={classes.lastMessege}>last messege</div>
        </div>
      </div>
    </li>
  );
}

export default ConversationItem;
