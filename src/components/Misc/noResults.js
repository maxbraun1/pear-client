import classes from "./noResults.module.css";
import NoResultsImg from "../../assets/icons/noResults.svg";

function NoResults(){
    return(
        <div className={classes.noResultsContainer}><img src={NoResultsImg}/></div>
    );
}

export default NoResults;