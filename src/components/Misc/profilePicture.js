import classes from "./profilePicture.module.css";

function ProfilePicture(props) {

  return (
    <div className={classes.PFP}>
        <p className={classes.profileChar}>{props.firstName.charAt(0).toUpperCase()}</p>
        { props.profilePicture !== null ? <img src={props.profilePicture}/> : null }
    </div>
  );
}

export default ProfilePicture;