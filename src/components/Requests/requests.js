import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./requests.module.css";
import Request from "./request";

function Requests(props) {
    const [listOfRequests, setListOfRequests] = useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API + '/requests/userRequests',{withCredentials: true}).then(function (response) {
            if(response.data.error === true){
                console.log("err:",response.data.message);
            }else{
                setListOfRequests(response.data);
            }
        });
    },[])

    return (
        <div className={classes.requestWrapper}>
            { listOfRequests.length > 0 ? listOfRequests.map((request) => <Request key={request.requestID} requestData={request} />) : null }
        </div>
    );
}

export default Requests;