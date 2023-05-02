import Registration from "./Registration.js";
import classes from "./LogInPage.module.css";
import { useState } from "react";
import Backdrop from "./backdrop.js";
import { useNavigate } from "react-router-dom";
import useCurrentLocalState from "../../util/storage.js";

function LogInPage() {
  const [registrationIsOpen, setRestrationIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useCurrentLocalState("", "jwt");
  // const [user, setUser] = new useCurrentLocalState("", "user");

  const navigate = useNavigate();

  function openRegistration() {
    setRestrationIsOpen(true);
  }

  function closeRegistration() {
    setRestrationIsOpen(false);
  }

  function AuthenticateAndNavigate() {
    const data = {
      username: username,
      password: password,
    };

    fetch("api/v1/auth/login", {
      headers: {
        "Content-Type": "application/json",
        // 'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        const status = response.status;
        if (status === 401 || status === 403) {
          console.log("unauthorized");
        } else if (status === 200) {
          console.log("in 200");
          const token = response.headers.get("authorization");
          setJwt(token);
          return response.json();
        } else {
          console.log("something went wrong");
        }
      })
      .then((data) => {
        if (data != null) {
          const d = JSON.stringify(data);
          localStorage.setItem("user", d);  
          navigate("/main-page");
        }
      });
  }

  return (
    <div className={classes.containerLogin}>
      <div className={classes.login}>
        <h1>Log In</h1>
        <div>
          <input
            placeholder="username or email"
            className="input"
            type="email"
            id="username"
            onChange={(elem) => setUsername(elem.target.value)}
          ></input>
        </div>
        <div>
          <input
            placeholder="password"
            className="input"
            type="password"
            id="password"
            onChange={(elem) => setPassword(elem.target.value)}
          ></input>
        </div>
        <button className="button-28" onClick={openRegistration}>Sign Up</button>
        <button className="button-28 " onClick={AuthenticateAndNavigate}>Log In</button>

        {registrationIsOpen && <Registration close={closeRegistration} />}
        {registrationIsOpen && <Backdrop close={closeRegistration} />}
      </div>
    </div>
  );
}

export default LogInPage;
