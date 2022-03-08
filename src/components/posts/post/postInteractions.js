import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import classes from "./postInteractions.module.css";
import heartIcon from "../../../assets/icons/heartIcon.svg";
import heartIconLiked from "../../../assets/icons/heartIcon-liked.svg";
import requestIcon from "../../../assets/icons/requestIcon.svg";
import commentIcon from "../../../assets/icons/commentIcon.svg";
import { LoggedContext } from "../../../App";
import { PostContext } from "./post.js";

function PostInteractions(props) {

    const navigate = useNavigate();

    const [requestAlreadyMade, setRequestAlreadyMade] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [request, setRequest] = useState(false);
    const {postUpToDate, setPostUpToDate} = useContext(PostContext);
    const {loggedStatus, setLoggedStatus} = useContext(LoggedContext);

    const [message, setMessege] = useState(null);

    useEffect(() => {
        setPostLiked(props.postLikes.includes(loggedStatus));

        if(loggedStatus !== false){
            Axios.post("http://localhost:3001/requests/checkRequest",{ postID: props.postID },{withCredentials: true}).then((response) => {
                if(response.data === true){
                    setRequestAlreadyMade(true);
                }
            });
        }
    },[props.postLikes, loggedStatus]);

    function toggleRequest(){
        if(loggedStatus !== false){
            setRequest(!request);
        }else{
            navigate("/login");
        }
    }

    function likePost(){
        // If User is Logged in
        if(loggedStatus !== false){
            Axios.post("http://localhost:3001/posts/like",{ userID: loggedStatus, postID: props.postID },{withCredentials: true}).then((response) => {
                if(response.data === true){
                    setPostUpToDate(!postUpToDate);
                }else{
                    console.log(response.data);
                }
            });
        }else{
            navigate("/login");
        } 
    }

    function sendRequest(){
        if(loggedStatus !== false){
            Axios.post("http://localhost:3001/requests/createRequest",{ message, postID: props.postID },{withCredentials: true}).then((response) => {
                if(response.data.error === false){
                    // success
                    setMessege("");
                    setRequest(false);
                    setRequestAlreadyMade(true);
                }else{
                    // fail
                    alert(response.data.message);
                }
            });
        }else{
            navigate("/login");
        } 
    }

    return (
        <div className={classes.postInteractions}>
            <div className={classes.postInteractionButton} onClick={likePost}><img src={postLiked ? heartIconLiked : heartIcon} alt="like button"/>{props.postLikesCount}</div>
            { !requestAlreadyMade ? <>
            <div className={classes.postInteractionButton} onClick={toggleRequest}><img src={requestIcon} alt="request button"/></div>
            </> : <>
            <div className={classes.postInteractionButtonRequestSent}>Request Sent</div>
            </>}

            { request ? <>
            <div className={classes.requestOverlay} onClick={toggleRequest}></div>
            <div className={classes.requestForm}>
                <p className={classes.requestFormTitle}>Want to Collaborate?</p>
                <textarea onChange={(e) => setMessege(e.target.value)} value={message || ""} className={classes.requestFormMessage} placeholder="Send a message with your request (optional)."></textarea>
                <p className={classes.requestFormDisclaimer}><span className={classes.requestFormAsterisk}>*</span> Sending request will give the poster access to your contact information (Email Address).</p>
                <button className={classes.requestFormButton} onClick={sendRequest}>Request to Join</button>
            </div>
            </> : null }
        </div>
    );
}

export default PostInteractions;