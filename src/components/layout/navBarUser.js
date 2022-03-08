import classes from "./navBarUser.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBarUser(props){
    const [userInfo, setUserInfo] = useState([])
    const [userDropdown,setUserDropdown] = useState(false)

    useEffect(() => {
        axios.post("http://localhost:3001/users/user", {userID: props.user}).then((response) => {
            setUserInfo(response.data);
        });
    }, [props.user])

    function toggleUserDropdown(){
        setUserDropdown(!userDropdown);
    }

    return(
        <div onClick={toggleUserDropdown} className={classes.navBarUser}>
            <div className={classes.navBarUserWrapper}>
                <div className={classes.PFP}>
                    { userInfo.firstName ? <p className={classes.profileChar}>{userInfo.firstName.charAt(0).toUpperCase()}</p> : null }
                    { userInfo.profilePicture ? <img src={userInfo.profilePicture}/> : null }
                </div>
                <div className={classes.username}>
                    { userInfo.firstName && userInfo.lastName ? <p className={classes.displayName}>{userInfo.firstName} {userInfo.lastName}</p> : null}
                </div>
            </div>
            { userDropdown ? <>
            <div className={classes.dropdown}>
                <Link to="/profile/view" className={classes.link}>Profile</Link>
                <Link to="/profile/requests" className={classes.link}>Requests</Link>
                <Link to="/profile/settings" className={classes.link}>Settings</Link>
                <Link to="/logout" className={classes.link}>Log Out</Link>
            </div>
            </> : null }
        </div>
    )
}

export default NavBarUser