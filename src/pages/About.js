import classes from "./About.module.css";
import FadeIn from "react-fade-in/lib/FadeIn";
import MeImg from "../assets/images/me.jpg";
import NavBar from "../components/layout/navBar";
import Footer from "../components/layout/footer";

function About(){
    return(
        <>
            <NavBar />
            <div className={classes.idea}>
                <img className={classes.meImg} src={MeImg}/>
                <h1 className={classes.ideaTitle}>Me and My Idea</h1>
                <p className={classes.ideaDesc}>My name is <a onClick={() => { window.location.href = 'https://maxbraun.us'}}>Max Braun</a>. I'm a senior in college majoring in Computer Science, with an interest in web development.</p>
                <p className={classes.ideaDesc}>With graduation around the corner, I began searching for real world jobs in my feild of interest. As I searched, I learned a lot about resumes and how valuable having a solid set of personal projects on your resume can be when job searching. I also learned that many companies greatly value soft skills such as teamwork and communication when hiring developers. As great as my college education has been thusfar, I realized I haven't had a considerable amount of experience working with other developers, and I surely didn't have a sizeable set of quality projects to show employers.</p>
                <p className={classes.ideaDesc}>So, I began hunting for project ideas. I searched on Google, only to find long lists of repetitive, generic projects that had been done a million times. I searched Reddit, and found some original ideas, but none that interested me, or were working with the same technologies I was interested in. I even asked some of my college peers what they were working on, but many of them didn't have any side projects and the ones that did were irrelivent to my area of interest.</p>

                <p className={classes.ideaDesc}>After a month or so of messing around with my resume and waiting for a project idea to strike me, I finally put two and two together. I'm interested in website development, I need a project, and junior developers need a place to find project ideas and stregthen their resume/teamwork skills. Why don't I just try to create a platform for junior developers to share project ideas and work together on them?</p>
                
                <p className={classes.ideaDesc}>And so I started working on Pear Programming with any time I could find between my actual job, college classes, and everything else. I plan on continuing to improve and add features to this project in any spare time I have.</p>
            </div>
            <Footer/>
        </>
        
    ) 
}

export default About;
