import classes from "./postTech.module.css";
import { Link } from "react-router-dom";

function PostTech(props) {
    return (
        <div className={classes.postTech}>
            {props.postTech ? props.postTech.map((tech) => <div key={tech} className={classes.techBubble}><Link to={"/?technology=" + tech}>{tech}</Link></div>) : null}
        </div>
    );
}

export default PostTech;