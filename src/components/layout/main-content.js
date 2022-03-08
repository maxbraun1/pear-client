import classes from "./main-content.module.css";

function MainContent(props){
    return <div className={classes.mainContent}>{props.children}</div>;
}

export default MainContent;