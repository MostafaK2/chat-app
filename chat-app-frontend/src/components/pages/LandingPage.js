import { useNavigate } from "react-router-dom";
import { useState } from "react";

import classes from "./login/LogInPage.module.css";
import landing from "../images/landing.png";
import ContactMe from "./ContactMe";
import Backdrop from "./login/backdrop";

function LandingPage() {
  const navigate = useNavigate();
  const [contactMeIsOpen, setContactMeIsOpen] = useState(false);

  function openContactMeIsOpen() {
    setContactMeIsOpen(true);
  }

  function closeContactMeIsOpen() {
    setContactMeIsOpen(false);
  }

  return (
    <div className={classes.containerLogin}>
      <div className={classes.login}>
        <img src={landing} className={classes.center} />
        <h2>Chatapp Designed and Developed by Mostafa Kamal</h2>
        <button
          className="btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In / Sign Up
        </button>
        <button className="btn" onClick={openContactMeIsOpen}>
          About Me
        </button>
        <button className="btn" onClick={openContactMeIsOpen}>
          Contact Information
        </button>
        {contactMeIsOpen && <ContactMe close={closeContactMeIsOpen} />}
        {contactMeIsOpen && <Backdrop close={closeContactMeIsOpen} />}
      </div>
    </div>
  );
}

export default LandingPage;
