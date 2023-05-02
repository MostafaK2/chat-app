import classes from "./UserHeader.module.css";

function UserHeader(props) {
  return (
    <div className={classes.container}>
      <button className={classes.circle} onClick={props.onClick}></button>
      <h2>{props.username}</h2>
    </div>
  );
}

export default UserHeader;
