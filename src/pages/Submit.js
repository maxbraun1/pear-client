import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/layout/navBar";
import classes from "./Submit.module.css"
import axios from 'axios';
import PageContainer from '../components/layout/page-container';

function Register() {
    const navigate = useNavigate();
    const [categoriesList, setCategoriesList] = useState([]);
    const [technologiesBoxValue, setTechnologiesBoxValue] = useState(null);

    // Form States
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [technologies,setTechnologies] = useState([]);
    const [postImage,setPostImage] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/categories/').then(function (response) {
            setCategoriesList(response.data);
            setCategory(response.data[0]._id);
        })
    },[]);

    function addTechnology(e){
        e.preventDefault();
        setTechnologies(technologies.concat(technologiesBoxValue));
        setTechnologiesBoxValue("");
    }

    function handleCategorySelectChange(e){
        setCategory(e);
    }

    function addPostImage(newPostID){
        const formData = new FormData();
    
        // Update the formData object
        formData.append(
            "postImage",
            postImage,
            postImage.name
        );
        formData.append("postID",newPostID);

        axios.post(process.env.REACT_APP_API + '/posts/addImage', formData ,{withCredentials: true}).then(function (response) {
            if(response.data.error === false){
                navigate("/feed");
            }else{
                console.log(response.data.message)
            }
        })

    }

    function publish(e){
        // Prevent page reload
        e.preventDefault();
    
        // Create post Json Object
        const post = {
          title: title,
          description: description,
          category: category,
          technologies: technologies
        };
    
        axios.post(process.env.REACT_APP_API + '/posts/', post ,{withCredentials: true}).then(function (response) {
            if(response.data.error === false){
                if(postImage){
                    addPostImage(response.data.newPostID);
                }else{
                    navigate("/feed");
                }
            }else{
                console.log(response.data)
            }
        })
      }
  return (
    <div>
      <NavBar/>
      <PageContainer>
          <div className={classes.formContainer}>
            <div className={classes.formWrapper}>
                <h1 className={classes.formTitle}>New Idea</h1>
                <form className={classes.postForm}>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Idea Title'/>
                    <textarea onChange={(e) => setDescription(e.target.value)} className={classes.descTextArea} placeholder='Describe your idea...'></textarea>
                    <div className={classes.categoryTechnologyContainer}>
                        <div className={classes.categoryArea}>
                            <label>Category</label>
                            <select onChange={(e) => handleCategorySelectChange(e.target.value)} className={classes.categorySelect}>
                                {categoriesList.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
                            </select>
                        </div>
                        <div className={classes.technologiesArea}>
                            <label>Technologies</label>
                            <div className={classes.addedTechnologies}>{ technologies.length > 0 ? technologies.map((technology,index)=><span key={index} className={classes.technology}>{technology}</span>) : "No technologies"}</div>
                            <div className={classes.technologyForm}>
                                <input className={classes.technologyEnterBox} type="text" onChange={(e) => setTechnologiesBoxValue(e.target.value)} placeholder="Enter Tag" value={technologiesBoxValue || ""}/>
                                <button onClick={addTechnology}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.imageUpload}>
                        <label>Add an Image</label>
                        <input type="file" onChange={(e)=> {setPostImage(e.target.files[0])}} />
                    </div>
                    <div className={classes.publishArea}>
                        <button onClick={publish}>Publish Post</button>
                    </div>
                </form>
            </div>
          </div>
          <div className={classes.formInfo}>
            
          </div>
      </PageContainer>
    </div>
  );
}

export default Register;