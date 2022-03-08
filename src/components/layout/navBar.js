import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../../App";
import classes from "./navBar.module.css";
import PearLogo from "../../assets/images/pearLogoFull.svg";
import NavBarUser from "./navBarUser";

function NavBar() {

  const {loggedStatus, setLoggedStatus} = useContext(LoggedContext)

  return (
    <nav className={classes.nav}>
      <div className={classes.navLeft}>
        <img className={classes.logo} src={PearLogo} alt="logo"/>
        <div className="nav-links">
          <Link to="/" className={classes.link}>Home</Link>
          <Link to="/feed" className={classes.link}>Feed</Link>
        </div>
      </div>
      <div className={classes.navRight}>
        { loggedStatus !== false ? <NavBarUser user={loggedStatus}/> : <Link to="/login" style={{marginRight: "20px"}} className={classes.link}>Log In</Link> }
      </div>
    </nav>
  );
}

export default NavBar;
