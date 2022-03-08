import classes from "./page-container.module.css";

function PageContainer(props){
    return <div className={classes.pageContainer}>{props.children}</div>
}

export default PageContainer;