import { useState } from "react";

import classes from "./Preferences.module.css";
import highlights from "../../conversations/ConversationItem.module.css";

import nameImg from "../../images/SettingsLogo/changeFLName.png";
import passImg from "../../images/SettingsLogo/changePassword.png";
import ChangeNames from "./ChangeNames";
import ChangePassword from "./ChangePassword";

function Preferences() {
  //   const [clickedSection, setClickedSection] = useState(0);

  //   function changeColor() {
  //     if (clickedSection == props.clickedId) {
  //       return highlights.colorChangeAlt;
  //     }
  //     return highlights.colorChange;
  //   }

  const [changeNamesIsOpen, setChangeNameIsOpen] = useState(false);
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);

  function openChangeName() {
    setChangeNameIsOpen(true);
    closePassword();
  }

  function closeChangeName() {
    setChangeNameIsOpen(false);
  }

  function openPassword() {
    setPasswordIsOpen(true);
    closeChangeName();
  }
  function closePassword() {
    setPasswordIsOpen(false);
  }

  // animate after
  function slide() {
    if (changeNamesIsOpen || passwordIsOpen) {
      return classes.boxalt;
    }
    return classes.box;
  }

  return (
    <div>
      <div className={slide()}>
        <div className={classes.container}>
          <h2>Preferences</h2>

          <li className={highlights.colorChange}>
            <div className={classes.child}>
              <div className={classes.circle}></div>
              <h4>Mostafa Kamal</h4>
            </div>
          </li>

          {/* Changing Account Information */}
          <li className={highlights.colorChange} onClick={openChangeName}>
            <div className={classes.child}>
              <img src={nameImg} alt="" width={30} height={30} />
              <h4>Change Account Information</h4>
            </div>
          </li>

          {/* changing password */}
          <li className={highlights.colorChange} onClick={openPassword}>
            <div className={classes.child}>
              <img src={passImg} alt="" width={30} height={30} />
              <h4>Change Password</h4>
            </div>
          </li>

          {/* Add notification and blocking features later */}
        </div>
      </div>
      <div>
        {changeNamesIsOpen && <ChangeNames close={closeChangeName} />}
        {passwordIsOpen && <ChangePassword close={closePassword} />}
      </div>
    </div>
  );
}

export default Preferences;
