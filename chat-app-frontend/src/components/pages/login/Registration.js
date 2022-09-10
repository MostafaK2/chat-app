import { useState, useEffect } from "react";

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
        <label>email</label>
        <input
          type="email"
          id="username"
          onChange={(elem) => setUsername(elem.target.value)}
        ></input>
      </div>

      <div>
        <label>SetFirstName</label>
        <input
          type="first-name"
          id="fname"
          onChange={(elem) => setFname(elem.target.value)}
        ></input>
      </div>

      <div>
        <label>Set last Name</label>
        <input
          type="last-name"
          id="lname"
          onChange={(elem) => setLname(elem.target.value)}
        ></input>
      </div>

      <div>
        <label>Set Password</label>
        <input
          type="password"
          id="pass"
          onChange={(elem) => setPassword(elem.target.value)}
        ></input>
      </div>
      <button onClick={cancelHandler}>Cancel</button>
      <button onClick={confirmRegistration}>confirm</button>
    </div>
  );
}

export default Registration;
