import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data';
import axios from "axios";
import classes from "./settings.module.css";
import RightArrow from "../../assets/icons/right-arrow-black.svg";
import DownArrow from "../../assets/icons/down-arrow-black.svg";

function Settings() {

    const navigate = useNavigate();

    const [personalSettings, setPersonalSettings] = useState(false);
    const [profilePictureSettings, setProfilePictureSettings] = useState(false);

    // Personal Info States
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [bio, setBio] = useState(null);

    // Profile Pictures States
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileBacksplash, setProfileBacksplash] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:3001/users/getPersonalSettings", { withCredentials: true }).then((response) => {
            if(response.data !== false){
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setBio(response.data.bio);
            }else{
                console.log("error");
            }
        });
    },[])

    function togglePersonalSettings(){
        setPersonalSettings(!personalSettings);
    }
    function toggleProfilePictureSettings(){
        setProfilePictureSettings(!profilePictureSettings);
    }

    function updatePersonalSettings(e){
        e.preventDefault();
        axios.post("http://localhost:3001/users/updatePersonalSettings",{ firstName, lastName, bio } , { withCredentials: true }).then((response) => {
            if(response.data.result !== false){
                navigate("/profile/view");
            }else{
                console.log(response.data.errors);
            }
        });
    }

    function updateProfilePicture(e){
        e.preventDefault();

        const formData = new FormData();
    
        // Update the formData object
        formData.append(
            "profilePicture",
            profilePicture,
            profilePicture.name
        );

        const config = {
            withCredentials: true,
        };
        axios.post("http://localhost:3001/users/updateProfilePicture", formData, config ).then((response) => {
            if(response.data.error === true){
                console.log(response.data.message)
            }else{
                navigate("/profile/view");
            }
        });
    }
    async function updateProfileBacksplash(e){
        e.preventDefault();

        const formData = new FormData();
    
        // Update the formData object
        formData.append(
            "profileBacksplash",
            profileBacksplash,
            profileBacksplash.name
        );

        const config = {
            withCredentials: true,
        };
        axios.post("http://localhost:3001/users/updateProfileBacksplash", formData, config ).then((response) => {
            if(response.data.error === true){
                console.log(response.data.message)
            }else{
                navigate("/profile/view");
            }
        });
    }

    return (
        <div className={classes.settings}>
            <h1 className={classes.settingsTitle}>Settings</h1>

            <div className={classes.settingsSectionWrapper}>
                <div className={classes.settingsSection}>
                    <div className={classes.settinsSectionHeader} onClick={togglePersonalSettings}>Personal Info <img src={ personalSettings ? DownArrow : RightArrow}/></div>
                    <form className={classes.settingsForm} style={{display: personalSettings ? "block": "none"}}>
                        <label>First Name</label>
                        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName || ""}/>
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName || ""}/>
                        <label>Bio</label>
                        <textarea placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio || ""}></textarea>
                        <button onClick={updatePersonalSettings}>Update</button>
                    </form>
                </div>
            </div>

            <div className={classes.settingsSectionWrapper}>
                <div className={classes.settingsSection}>
                    <div className={classes.settinsSectionHeader} onClick={toggleProfilePictureSettings}>Profile Picture and Backsplash <img src={ profilePictureSettings ? DownArrow : RightArrow}/></div>
                    <div className={classes.profileUploadsWrapper} style={{display: profilePictureSettings ? "block" : "none"}}>
                        <div className={classes.fileUploadForm}>
                            <h1 className={classes.profilePictureHeader}>Update Profile Picture</h1>
                            <input type="file" onChange={(e) => {setProfilePicture(e.target.files[0])}} />
                            <button onClick={updateProfilePicture}>Update</button>
                        </div>
                        <form className={classes.fileUploadForm}>
                            <h1 className={classes.profilePictureHeader}>Update Profile Backsplash</h1>
                            <input type="file" onChange={(e)=> {setProfileBacksplash(e.target.files[0])}} />
                            <button onClick={updateProfileBacksplash}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;