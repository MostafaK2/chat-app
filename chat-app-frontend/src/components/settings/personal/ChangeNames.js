import classes from "./ChangeNames.module.css";
import { useState } from "react";

function ChangeNames(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
 

  // PUT update values
  function saveInformation() {
    
    if(firstName > 0 && lastName > 0){
      
    }
    props.close();
    return;
  }

  
  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
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
          <button className={classes.button} onClick={() => props.close()}>
            Cancel
          </button>
          <button className={classes.button} onClick={saveInformation}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeNames;