import classes from "../../conversations/ConversationItem.module.css";
import sClasses from "./PersonalSettings.module.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";


function SettingOption(props) {
  const [clickedSection, setClickedSection] = useState(0);
  const navigate = useNavigate();

  function changeColor() {
    if (clickedSection == props.clickedId) {
      return classes.colorChangeAlt;
    }
    return classes.colorChange;
  }

  function onClick() {
    setClickedSection(props.id);
    if (props.id == 1) {
      props.open();
    }
    else if (props.id === 6) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      navigate("/login")
      
    }
    return props.callback(props.id);
  }

  return (
    <li className={changeColor()} onClick={onClick}>
      <div className={sClasses.container}>
        <img src={props.img} alt="" width="30" height="30"></img>
        <div>{props.name}</div>
      </div>
    </li>
  );
}

export default SettingOption;
