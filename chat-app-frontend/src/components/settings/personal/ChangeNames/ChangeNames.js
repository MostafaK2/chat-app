import classes from "./ChangeNames.module.css";
import { useState } from "react";
import useCurrentLocalState from "../../../../util/storage";

function ChangeNames(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  var [user, setUser] = useCurrentLocalState("", "user");
  user = JSON.parse(user);

  // PUT update values
  function saveInformation() {
    if (firstName.length === 0 && lastName.length === 0) {
      // create a pop up
      return;
    }

    const data = {
      fname: firstName,
      lname: lastName,
    };

    const url = "api/v1/users/" + user.id;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    // also update the local storage to fix the error of the name not showing up
    user.fname = firstName.length > 0 ? firstName : user.fname;
    user.lname = lastName.length > 0 ? lastName : user.lname;
    props.setUserMeta(user);
    localStorage.setItem("user", JSON.stringify(user));
    props.close();
    return;
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <h2>Change Name</h2>
        <input
          className={classes.input}
          placeholder="New First Name"
          type="text"
          onChange={(elem) => setFirstName(elem.target.value)}
        ></input>
        <input
          className={classes.input}
          placeholder="New Last Name"
          type="text"
          onChange={(elem) => setLastName(elem.target.value)}
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

export default ChangeNames;
