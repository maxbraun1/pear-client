import classes from "./sidebar.module.css";

function Sidebar(props){
    return <div className={classes.sidebar}>{props.children}</div>
}

export default Sidebar;