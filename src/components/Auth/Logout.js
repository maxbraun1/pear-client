import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react'
import { LoggedContext } from '../../App';

function Logout() {

    const navigate = useNavigate();

    const { loggedStatus, checkLoggedStatus } = useContext(LoggedContext)

    useEffect(() => {

        axios.get('http://localhost:3001/auth/logout',{withCredentials: true})
        .then(function (response) {
            if(response.data === true){
                checkLoggedStatus();
                navigate("/login");
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    })

    return(null)
}

export default Logout;