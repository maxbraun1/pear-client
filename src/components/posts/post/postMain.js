import classes from "./postMain.module.css";

function PostMain(props) {
    return (
        <div className={classes.postMain}>
            {props.postImage ? <>
                <div className={classes.postImage}><img src={props.postImage}/><div className={classes.shadow}></div></div>
            </>: null}
            <h1 className={classes.postTitle}>{props.postTitle}</h1>
            <p className={classes.postDesc}>{props.postDesc}</p>
        </div>
    );
}

export default PostMain;