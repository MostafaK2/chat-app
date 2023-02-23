import classes from "../../conversations/ConversationItem.module.css";
import sClasses from "./PersonalSettings.module.css";

import { useState, useEffect } from "react";

function SettingOption(props) {
  const [clickedSection, setClickedSection] = useState(0);

  function changeColor() {
    if (clickedSection == props.clickedId) {
      return classes.colorChangeAlt;
    }
    return classes.colorChange;
  }

  return (
    <li
      className={changeColor()}
      onClick={() => {
        setClickedSection(props.id);
        if (props.id == 1) {
          props.open();
        }
        return props.callback(props.id);
      }}
    >
      <div className={sClasses.container}>
        <img src={props.img} alt="" width="30" height="30"></img>
        <div>{props.name}</div>
      </div>
    </li>
  );
}

export default SettingOption;
