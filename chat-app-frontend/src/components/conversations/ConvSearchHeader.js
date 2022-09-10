import classes from "./ConversationList.module.css"
import useCurrentLocalState from "../../util/storage";
import { useState } from "react";

function ConvSearchHeader() {
  // const user = JSON.parse(useCurrentLocalState("", "user"));
  const [search, setSearch] = useState();

  return (
    <div className={classes.stickToTop}>
      <h1>{}</h1>
      <input>search Bar</input>
      <button>Add group Btn</button>
    </div>
  );
}

export default ConvSearchHeader;