import NavBar from "../components/layout/navBar";
import classes from "../components/Auth/AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import { LoggedContext } from '../App';
import GoogleLoginButton from "../components/Auth/googleLoginButton";
import AuthLayout from "../components/layout/auth-layout/authLayout";

function Login() {

  const navigate = useNavigate();
  const {loggedStatus, checkLoggedStatus} = useContext(LoggedContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function login(e){
    // Prevent page reload
    e.preventDefault();

    // Create newUser Json Object
    const user = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:3001/auth/login',user,{withCredentials: true})
    .then(function (response) {
      if(response.data === true){
        checkLoggedStatus();
        navigate("/feed");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <NavBar />
      <AuthLayout>
        <div className={classes.AuthForm}>
          <form>
            <h1>Log In</h1>
            <input type="text"  onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email"></input>
            <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
            <button onClick={login}>Login</button>
            <GoogleLoginButton method="Sign In"></GoogleLoginButton>
          </form>
          <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
