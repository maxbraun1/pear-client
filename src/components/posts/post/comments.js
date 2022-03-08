import React, { useEffect, useState } from "react";
import Axios from "axios";
import classes from "./comments.module.css";
import RightArrow from "../../../assets/icons/white-arrow-white.svg";

function Comments(props) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        /*Axios.post("http://localhost:3001/categories/",{ categoryID: props.postCategory}).then((response) => {
            setCategoryInfo(response.data);
        });*/
    },[props]);

    return (
        <div className={classes.comments}>
           <div className={classes.newComment}>
               <textarea placeholder="Comment..."></textarea>
               <button className={classes.sendComment}><img src={RightArrow}/></button>
           </div>
        </div>
    );
}

export default CategoryBar;