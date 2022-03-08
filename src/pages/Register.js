import { useState, useContext } from 'react'
import NavBar from "../components/layout/navBar";
import { Link, useNavigate } from "react-router-dom";
import classes from "../components/Auth/AuthForm.module.css"
import axios from 'axios';
import { LoggedContext } from '../App';
import GoogleLoginButton from '../components/Auth/googleLoginButton.js';
import AuthLayout from '../components/layout/auth-layout/authLayout';

function Register() {

  const navigate = useNavigate();
  const {loggedStatus, checkLoggedStatus} = useContext(LoggedContext);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  function register(e){
    // Prevent page reload
    e.preventDefault();

    // Create newUser Json Object
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    axios.post('http://localhost:3001/auth/register', newUser,{withCredentials: true})
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
            <h1>Register</h1>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"></input>
            <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"></input>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></input>
            <button onClick={register}>Register</button>
            <GoogleLoginButton method="Register"></GoogleLoginButton>
          </form>
          <p>Already have an account? <Link to="/login">Log In Here</Link></p>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Register;
