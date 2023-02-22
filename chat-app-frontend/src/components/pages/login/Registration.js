import { useState, useEffect } from "react";
import classes from "./LogInPage.module.css";

function Registration(props) {
  function cancelHandler() {
    props.close();
  }

  // function to handle
  function confirmRegistration() {
   
    const data = {
      "username": username,
      "fname": fname,
      "lname": lname,
      "password": password
    }
    console.log(data)
    fetch("api/v1/users", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => console.log(response));

    props.close();
  }

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="registration">
      <div>
        <input
          placeholder="Set Email"
          className={classes.input}
          type="email"
          id="username"
          onChange={(elem) => setUsername(elem.target.value)}
        ></input>
      </div>

      <div>
        <input
          placeholder="Set First Name"
          className={classes.input}
          type="first-name"
          id="fname"
          onChange={(elem) => setFname(elem.target.value)}
        ></input>
      </div>

      <div>
        
        <input
          placeholder="Set last Name"
          className={classes.input}
          type="last-name"
          id="lname"
          onChange={(elem) => setLname(elem.target.value)}
        ></input>
      </div>

      <div >
        <input
          className={classes.input}
          placeholder="Set Password"
          type="password"
          id="pass"
          onChange={(elem) => setPassword(elem.target.value)}
        ></input>
      </div>
      <div className = {classes.buttonGrid}>
        <button className ="btn" onClick={cancelHandler}>Cancel</button>
        <button className="btn" onClick={confirmRegistration}>Confirm</button>
      </div>
     
    </div>
  );
}

export default Registration;
