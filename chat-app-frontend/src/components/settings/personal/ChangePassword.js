import classes from "./ChangeNames.module.css";
import { useState } from "react";

function ChangePassword(props) {
  // PUT update values
  function saveInformation() {
    props.close();
    return;
  }

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <h2>Change Password</h2>
        <input
          className={classes.input}
          placeholder="Current Password"
          type="password"
          onChange={(elem) => setOldPassword(elem.target.value)}
        ></input>
        <input
          className={classes.input}
          placeholder="Old Password"
          type="password"
          onChange={(elem) => setNewPassword(elem.target.value)}
        ></input>

        <div className={classes.child}>
          <button className="button-28" onClick={() => props.close()}>
            Cancel
          </button>
          <button className="button-28 accept" onClick={saveInformation}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
