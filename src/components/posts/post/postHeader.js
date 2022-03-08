import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./postHeader.module.css";
import threeDotsSVG from "../../../assets/icons/three-dots.svg";
import { LoggedContext } from '../../../App';
import ProfilePicture from "../../Misc/profilePicture";

function PostHeader(props) {
    const [userInfo, setUserInfo] = useState(null)
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [currentUsersPost, setCurrentUsersPost] = useState(false);

    const {loggedStatus, checkLoggedStatus} = useContext(LoggedContext);

    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    const date = new Date(props.timestamp).toLocaleDateString(undefined, options);

    const navigate = useNavigate()

    useEffect(() => {
        axios.post(process.env.REACT_APP_API + "/users/user", { userID: props.userID }).then((response) => {
            setUserInfo(response.data);
            if(loggedStatus == props.userID){ setCurrentUsersPost(true) }
        });
    },[props.userID]);

    function toggleOptions(){
        setShowPostOptions(!showPostOptions);
    }

    function deletePost(){
        axios.post(process.env.REACT_APP_API + "/posts/delete", { postID: props.postID }, {withCredentials: true}).then((response) => {
            if(response.data !== true){
                console.log(response.data.errorMessage);
            }else{
                window.location.reload(false);
            }
        });
    }

    return (
        <div className={classes.postHeader}>
            { userInfo !== null ? <>
            <div className={classes.postHeaderMain}>
                <ProfilePicture firstName={userInfo.firstName} profilePicture={userInfo.profilePicture} />
                <div className={classes.username}>
                    <p className={classes.displayName}>{userInfo.firstName} {userInfo.lastName}</p>
                    <p className={classes.timestamp}>{date}</p>
                </div>
            </div>
            <div className={classes.postHeaderOptionsBtn} onClick={toggleOptions}>
                <img src={threeDotsSVG}/>
                { showPostOptions ? <>
                    <div className={classes.overlay}></div>
                    <div className={classes.postOptions}>
                        <Link to={"/user?id=" + props.userID} className={classes.link}>User's Profile</Link>
                        { currentUsersPost ? <div className={classes.noLink} onClick={deletePost}>Delete Post</div> : null }
                    </div>
                </>: null}
            </div>
            </> : null }
        </div>
    );
}

export default PostHeader;
