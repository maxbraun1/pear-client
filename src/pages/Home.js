import NavBar from "../components/layout/navBar";
import { useNavigate, Link } from "react-router-dom";
import classes from './Home.module.css';
import BackgroundPattern from '../assets/images/pearLogoPattern.svg';
import FadeIn from 'react-fade-in';
import CollaborateIcon from '../assets/icons/featureIcons/collaborateIcon.svg';
import LightbulbIcon from '../assets/icons/featureIcons/lightbulbIcon.svg';
import SearchIcon from '../assets/icons/featureIcons/searchIcon.svg';
import SendIcon from '../assets/icons/featureIcons/sendIcon.svg';
import Post from "../components/posts/post/post";
import Footer from "../components/layout/footer";

function Home() {

  const navigate = useNavigate();


  function headButton(){
    navigate('/register');
  }
  function toMyWebsite(){
    navigate("https://maxbraun.us");
  }
  return (
    <div>
      <NavBar />
      <div className={classes.header} style={{backgroundImage: `url(${BackgroundPattern})`}}>
        <div className={classes.headerLeft}>
          <div className={classes.headerLeftContainer}>
            <FadeIn>
              <h1 className={classes.headTitle}>Pear Programming</h1>
              <p className={classes.headDesc}>A place for developers to share ideas, find inspiration, and work together to build their skills and resumes.</p>
            </FadeIn>
          </div>
        </div>
        <div className={classes.headerRight}>
          <FadeIn>
          <div className={classes.feature}>
            <img className={classes.featureIcon} alt="lightbulb" src={LightbulbIcon}/>
            <div className={classes.featureInfo}>
              <h2 className={classes.featureTitle}>Post Ideas</h2>
              <p className={classes.featureDesc}>Post and describe your great ideas!</p>
            </div>
          </div>
          <div className={classes.feature}>
            <img className={classes.featureIcon} alt="search icon" src={SearchIcon}/>
            <div className={classes.featureInfo}>
              <h2 className={classes.featureTitle}>Search Ideas</h2>
              <p className={classes.featureDesc}>Search by development category, popularity, or technology tags.</p>
            </div>
          </div>
          <div className={classes.feature}>
            <img className={classes.featureIcon} alt="send icon" src={SendIcon}/>
            <div className={classes.featureInfo}>
              <h2 className={classes.featureTitle}>Send Requests</h2>
              <p className={classes.featureDesc}>Find an idea you like? Send a collaboration request to the post creator.</p>
            </div>
          </div>
          <div className={classes.feature}>
            <img className={classes.featureIcon} alt="collab icon" src={CollaborateIcon}/>
            <div className={classes.featureInfo}>
              <h2 className={classes.featureTitle}>Team Up</h2>
              <p className={classes.featureDesc}>Work together to create something great.</p>
            </div>
          </div>
          </FadeIn>
        </div>
      </div>
      
      <div className={classes.about}>
        <div className={classes.aboutDesc}>
          <h1 className={classes.aboutDescTitle}>What is Pear Programming?</h1>
          <p>Pear Programming is a place for junior developers to build their development skills, teamwork skills (pair programming), and resumes.</p>
          <p>The idea behind this website is that it's often difficult for junior developers to find interesting and usefull projects to work on while building their resume and heading into the world of job searching. Businesses value a developer's ability and experience working with others, but it can be difficult to find developers with similar interests and skill levels to work with.</p>
          <Link to="/about"><button>Read More</button></Link>
        </div>
        <div className={classes.aboutPost}>
          <Post key="1" postID="6220ea3cea256d2f3ccc7377"></Post>  
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Home;
