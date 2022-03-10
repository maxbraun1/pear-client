import classes from "./navSidebar.module.css";

function NavSidebar(props){
    return <div className={classes.navSidebar} style={props.show ? props.show === true? {display: 'block'} : {display: 'none'} : null}>
        {props.children}
    </div>
}

export default NavSidebar;