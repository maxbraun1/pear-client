import classes from "./navSidebar.module.css";

function NavSidebar(props){
    return <div className={classes.navSidebar}>
        {props.children}
    </div>
}

export default NavSidebar;