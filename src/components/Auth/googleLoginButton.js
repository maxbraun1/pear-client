import { Link } from 'react-router-dom';
import classes from './googleLoginButton.module.css';
import googleIcon from '../../assets/images/google-icon.png';

function GoogleLoginButton(props) {

    return(
        <a href="http://localhost:3001/auth/google" className={classes.GoogleLoginButton}>{props.method} with Google <img src={googleIcon} /></a>
    )
}

export default GoogleLoginButton;