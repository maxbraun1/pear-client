import classes from "./navSidebarLink.module.css";
import { NavLink } from "react-router-dom";

function NavSidebarLink(props){
    return(
        <NavLink className='active' to={props.to}><div className={classes.linkInner}>{props.children}</div></NavLink>
    )
}

export default NavSidebarLink;