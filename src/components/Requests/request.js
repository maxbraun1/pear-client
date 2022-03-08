import classes from "./request.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "../Misc/profilePicture";

function Request(props) {
  console.log(props.requestData)
    const request = props.requestData;

    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    const date = new Date(request.requestTimestamp).toLocaleDateString(undefined, options);

    let border = "transparent";
    let status = "Pending"
    if(request.status === "accepted"){
      border = "#499e44";
      status = "Email: "+request.fromUserEmail;
    }else if(request.status == "declined"){
      border = "#b03a3a";
      status = "Declined";
    }

    function answerRequest(answer){
      if(window.confirm("Are you sure you to "+answer+" this request?") === true){
        axios.post("http://localhost:3001/requests/answer", { requestID: request.requestID, answer }, {withCredentials: true}).then((response) => {
          console.log(response.data)
            if(response.data.error === true){
                console.log(response.data.message);
            }else{
                window.location.reload(false);
            }
        });
      }
    }

  return (
    <div className={classes.request} style={{border: "2px solid "+border}}>
        <div className={classes.requestHeader}>
          <ProfilePicture firstName={request.firstName} profilePicture={request.profilePicture}/>
          <div style={{paddingLeft: "10px"}}>
            <h1 className={classes.requestTitle}><Link to={"/user?id=" + request.fromUser}>{request.firstName} {request.lastName} </Link> would like to join <Link to={"/feed?postID="+request.postID}>{request.postTitle}</Link></h1>
            <p className={classes.requestDate}>{date}</p>
          </div>
        </div>
        { request.message ? <div className={classes.requestMessage}>{request.message}</div> : null }
        <div className={classes.requestInteractions}>
          { request.status === "pending" ? <>
          <div onClick={() => {answerRequest("accept")}} className={classes.requestAcceptBtn}>Accept</div>
          <div onClick={() => {answerRequest("decline")}} className={classes.requestDeclineBtn}>Decline</div>
          </> : status }
        </div>
    </div>
  );
}

export default Request;
