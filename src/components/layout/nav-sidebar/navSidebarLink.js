import classes from "./navSidebarLink.module.css";
import { Link } from "react-router-dom";
import Arrow from "../../../assets/icons/right-arrow.svg";

function NavSidebarLink(props){
    return(
        <Link className={classes.link} to={props.to}><div className={classes.linkInner}>{props.linkTitle} <img src={Arrow}/></div></Link>
    )
}

export default NavSidebarLink;