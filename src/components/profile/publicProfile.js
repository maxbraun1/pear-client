import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../posts/post/post";
import classes from "./profile.module.css";
import DefaultCover from "../../assets/images/defaultCover.png";
import HeartIcon from "../../assets/icons/heartIcon-liked.svg";
import PostIcon from "../../assets/icons/lightbulbIcon.svg";
import CalendarIcon from "../../assets/icons/calendarIcon.svg";

function PublicProfile(props) {
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [bio,setBio] = useState(null);
    const [accountDate,setAccountDate] = useState(null);
    const [profilePicture,setProfilePicture] = useState(null);
    const [profileBacksplash,setProfileBacksplash] = useState(null);
    const [posts,setPosts] = useState([]);
    const [postCount,setPostCount] = useState(0);
    const [likedCount,setLikedCount] = useState(0);

    useEffect(()=>{
        if(props.userID != null){
            axios.post('http://localhost:3001/users/public',{ userID: props.userID }).then(function (response) {
                if(response.data === false){
                    console.log("error");
                }else{
                    const user = response.data;
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setBio(user.bio);
                    setPosts(user.posts.reverse());
                    setAccountDate(user.accountDate);
                    setProfilePicture(user.profilePicture);
                    setProfileBacksplash(user.profileBacksplash);
                    setPostCount(user.postCount);
                    setLikedCount(user.likedCount);
                }
            });
        }
    },[props.userID])

    function getMemberDate(timestamp){
        const options = { year: "numeric", month: "long"}
        const date = new Date(timestamp).toLocaleDateString(undefined, options);
        return date;
    }

    return (
        <div>
        <div className={classes.profileWrapper}>
            <div className={classes.profileCoverPhoto} style={{backgroundImage: `url(${ profileBacksplash ? profileBacksplash : DefaultCover})`}}></div>
            <div className={classes.profileFlex}>
                <div className={classes.profileLeftBar}>
                    { firstName && profilePicture === null ? <p className={classes.profileChar}>{firstName.charAt(0).toUpperCase()}</p> : null }
                    { profilePicture !== null ? <div className={classes.profilePicture} style={{backgroundImage: `url(${profilePicture})`}}></div> : null }
                    <div className={classes.profileName}>{firstName + " " + lastName}</div>
                    <div className={classes.profileBio}>{bio}</div>
                    <div className={classes.pofileInfo}>
                        <div className={classes.profileInfoStat}><img src={PostIcon}/><span className={classes.profileStatTitle}>Posts: </span>{postCount}</div>
                        <div className={classes.profileInfoStat}><img src={HeartIcon}/><span className={classes.profileStatTitle}>Liked Posts: </span>{likedCount}</div>
                        <div className={classes.profileInfoStat}><img src={CalendarIcon}/><span className={classes.profileStatTitle}>Joined: </span>{getMemberDate(accountDate)}</div>
                    </div>
                </div>
                <div className={classes.profileRight}>
                    <div className={classes.postsWrapper}>
                        { posts.length > 0 ? posts.map((post) => (<Post key={post} postID={post} />)) : null}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default PublicProfile;