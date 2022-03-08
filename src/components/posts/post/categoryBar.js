import React, { useEffect, useState } from "react";
import Axios from "axios";
import classes from "./categoryBar.module.css";
import DownArrow from "../../../assets/icons/down-arrow.svg";

function CategoryBar(props) {
    const [categoryInfo, setCategoryInfo] = useState([])

    useEffect(() => {
        Axios.post(process.env.REACT_APP_API + "/categories/",{ categoryID: props.postCategory}).then((response) => {
            setCategoryInfo(response.data);
        });
    },[props]);

    return (
        <div className={classes.categoryBar} style={{backgroundColor: '#'+categoryInfo.color}}>
           <p className={classes.categoryName}>{categoryInfo.name}</p>
        </div>
    );
}

export default CategoryBar;