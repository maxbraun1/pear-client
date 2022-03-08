import {useState} from "react";
import axios from "axios";
import classes from './footer.module.css';

function Footer(){

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageSent, setMessageSent] = useState(false);

    function sendMessage(e){
        e.preventDefault()
        if(name && email && message){
            axios.post(process.env.REACT_APP_API + '/message/', {name, email, message}).then(function (response) {
            if(response.data.error === false){
                setMessageSent(true);
            }else{
                alert(response.data.message)
            }
        })
        }else{
            alert("Please fill out all fields.");
        }
    }

    return(
        <>
        {!messageSent ? <>
            <div className={classes.contactInfo}>
                <form className={classes.contactForm}>
                <h1 className={classes.contactFormHeader}>Questions or comments?</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Message..."></textarea>
                <button onClick={sendMessage}>Send</button>
                </form>
            </div>
            </> : <div className={classes.messageSent}>Thanks! Message Sent.</div> }
            <footer className={classes.footer}>© 2022 Pear Programming - All Rights Reserved.</footer>
        </>
    )
}

export default Footer;