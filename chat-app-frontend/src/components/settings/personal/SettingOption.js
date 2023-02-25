import classes from "../../conversations/ConversationItem.module.css";
import sClasses from "./PersonalSettings.module.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import terms from "../../images/termsChatgbt.pdf";

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
    if (props.id === 1 || props.id === 2) {
      props.open();
    } else if (props.id === 3) {
      navigate("/");
    } else if (props.id === 4 || props.id === 5) {
      window.open(terms, "_blank");
    } else if (props.id === 6) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      navigate("/login");
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
