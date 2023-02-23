import classes from "./PersonalSettings.module.css";
import SettingOption from "./SettingOption";
import { useState } from "react";

// images
import conf from "../../images/SettingsLogo/conf.png";
import extra from "../../images/SettingsLogo/extra.png";
import help from "../../images/SettingsLogo/Help.png";
import about from "../../images/SettingsLogo/information.png";
import logout from "../../images/SettingsLogo/logout.png";
// import report from "../images/SettingsLogo/report.png";
//end of images

function PersonalSettings(props) {
  const [currId, setCurrId] = useState(-1);

  function callback(currId) {
    setCurrId(currId);
    props.close();
  }

  return (
    <div className={classes.box}>
      <SettingOption
        id={1}
        clickedId={currId}
        callback={callback}
        name="Preferences"
        img={conf}
        open={props.open}
      />
      <SettingOption
        id={2}
        clickedId={currId}
        callback={callback}
        name="Help"
        img={help}
      />
      <SettingOption
        id={3}
        clickedId={currId}
        callback={callback}
        name="About"
        img={about}
      />
      <SettingOption
        id={4}
        clickedId={currId}
        callback={callback}
        name="Terms"
        img={extra}
      />
      <SettingOption
        id={5}
        clickedId={currId}
        callback={callback}
        name="Privacy Policy"
        img={extra}
      />
      <SettingOption
        id={6}
        clickedId={currId}
        callback={callback}
        name="Log Out"
        img={logout}
      />
    </div>
  );
}

export default PersonalSettings;
