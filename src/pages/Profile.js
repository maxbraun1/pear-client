import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "../components/layout/navBar";
import MainContent from "../components/layout/main-content";
import PageContainer from "../components/layout/page-container";
import NavSidebar from "../components/layout/nav-sidebar/navSidebar";
import NavSidebarLink from "../components/layout/nav-sidebar/navSidebarLink";
import UserProfile from "../components/profile/userProfile";
import Settings from "../components/profile/settings";
import { useEffect, useContext } from "react";
import { LoggedContext } from "../App";
import Requests from "../components/Requests/requests";

function Profile() {

  const {loggedStatus, setLoggedStatus} = useContext(LoggedContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(loggedStatus === false){
      navigate("/login");
    }
  }, [loggedStatus, navigate])

  return (
    <div>
      <NavBar />
      <PageContainer>
        <NavSidebar>
          <NavSidebarLink to="./view">Your Profile</NavSidebarLink>
          <NavSidebarLink to="./settings">Settings</NavSidebarLink>
          <NavSidebarLink to="./requests">Requests</NavSidebarLink>
        </NavSidebar>
        <MainContent>
          <Routes>
            <Route path="/view" element={<UserProfile/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/requests" element={<Requests/>} />
          </Routes>
        </MainContent>
      </PageContainer>
    </div>
  );
}

export default Profile;
