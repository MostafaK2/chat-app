import classes from "../conversations/ConversationItem.module.css";
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
        return props.callback(props.id);
      }}
    >
      <div className={sClasses.container}>
        <img
          src={props.img}
          alt=""
          width="30"
          height="30"
        ></img>
        <div>{props.name}</div>
      </div>
    </li>
  );
}

export default SettingOption;
