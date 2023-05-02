import classes from "./MessegeItem.module.css";
//change this later

function MessegeItem(props) {
  function colorChange(num) {
    if (num === props.curr_user_id) {
      return classes.itemStyling;
    } else {
      return classes.itemStylingAlt;
    }
  }

  function colorChangeIcon(num) {
    if (num === props.curr_user_id) {
      return classes.icon1;
    } else {
      return classes.icon2;
    }
  }

  function fname() {
    var fname = "";
    if (props.user_details !== undefined) {
      fname =
        props.user_details.fname.slice(0, 1).toUpperCase() +
        props.user_details.fname.slice(1);
    }

    return fname;
  }

  function icon() {
    var icon = "";
    if (props.user_details !== undefined) {
      icon =
        props.user_details.fname.slice(0, 1).toUpperCase() +
        props.user_details.lname.slice(0, 1).toUpperCase();
    }

    return icon;
  }

  // function timeDisplay() {
  //   if (props.time === null) {
  //     return null;
  //   }
  //   const arrTime = props.time.split("T");
  //   const date = arrTime[0].slice(5);
  //   const time = arrTime[1].slice(0, 5);

  //   return (
  //     <div className={classes.time}>
  //       <div>{date}</div>
  //       <div>{time}</div>
  //     </div>
  //   );
  // }

  return (
    <li>
      <div className={classes.container}>
        <div>
          <div className={classes.nameHeader}>{fname()}</div>
          <div className={colorChangeIcon(props.user_id)}>{icon()}</div>
          {/* {timeDisplay()} */}
        </div>
        <div className={colorChange(props.user_id)}>{props.text}</div>
      </div>
    </li>
  );
}
export default MessegeItem;
