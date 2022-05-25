import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/layout/navBar";
import PostList from "../components/posts/postList";
import PageContainer from "../components/layout/page-container";
import MainContent from "../components/layout/main-content";
import NavSidebar from "../components/layout/nav-sidebar/navSidebar";
import { Link } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../assets/icons/plusIcon.svg";
import classes from "./Feed.module.css";
import NavSidebarLink from "../components/layout/nav-sidebar/navSidebarLink";
import { LoggedContext } from '../App';
import XIcon from "../assets/icons/xIcon.svg";
import DownArrow from "../assets/icons/down-arrow-black.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/homeIcon.svg";
import { ReactComponent as ThumbIcon } from "../assets/icons/thumbUpIcon.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heartIcon.svg";

function Feed() {
  const [technology, setTechnology] = useState(null);
  const [categories, setCategories] = useState(null);
  const [showSideBar, setShowSidebar] = useState(null);
  const [showCategories, setShowCategories] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const { loggedStatus, checkLoggedStatus } = useContext(LoggedContext)

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API + "/categories/").then((response) => {
      setCategories(response.data);
    });
    setShowSidebar(false)
  },[searchParams])

  function updateTechnology(e){
    if(e.keyCode == 13){
      navigate("?technology="+technology)
      setTechnology(null);
      setShowSidebar(false);
    }
  }

  function toggleSidebar(){
    if(showSideBar == null){
      setShowSidebar(true)
    }else{
      setShowSidebar(!showSideBar)
    }
  }

  function toggleCategories(){
    setShowCategories(!showCategories);
  }

  return (
    <div>
      <NavBar />
      <PageContainer>
        <NavSidebar show={showSideBar}>
          <div className={classes.searchTechnologies}><input onKeyDown={updateTechnology} value={technology || ""} onChange={(e)=>setTechnology(e.target.value)} type="text" placeholder="Search By Technology"/></div>
          <div className={classes.sidebarContainer}>
            <NavSidebarLink to="./"><HomeIcon/> Home</NavSidebarLink>
            <NavSidebarLink to="?sortBy=mostlikes"><ThumbIcon/>Most Likes</NavSidebarLink>
            { loggedStatus !== false ? <>
              <NavSidebarLink to="?likes=true"><HeartIcon/>Your Likes</NavSidebarLink>
            </> : null }
          </div>
          <div className={classes.searchCategories}>
            <div className={classes.searchCategoriesButton} onClick={toggleCategories}>Categories<img src={DownArrow} style={ showCategories ? null : {"transform":"rotate(-90deg)"}}/></div>
            { categories && showCategories ? categories.map((category) => <Link style={{"backgroundColor":"#"+category.color}} key={category._id} onClick={toggleSidebar} to={"?category="+category._id}>{category.name}</Link>) : null }
          </div>
          <button onClick={toggleSidebar} className={classes.closeSidebar}><img src={XIcon}/> Close</button>
        </NavSidebar>
        <MainContent>
          { loggedStatus !== false ? <>
            <div className={classes.newPostButtonContainer}><Link className={classes.newPostButton} to="/submit">Post a New Idea</Link></div>
          </> : null }
          <div className={classes.openSidebar} onClick={toggleSidebar}>Categories and Sort <img src={DownArrow}/></div>
          <PostList />
        </MainContent>
      </PageContainer>
    </div>
  );
}

export default Feed;
