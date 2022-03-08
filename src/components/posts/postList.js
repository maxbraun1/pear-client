import { useState, useEffect } from "react";
import Axios from "axios";
import Post from "./post/post";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./postList.module.css";
import axios from "axios";
import NoResults from "../Misc/noResults.js";

function PostList() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    checkParams(searchParams);
  }, [searchParams]);

  return (
    <div className={classes.postList}>
      { listOfPosts.length > 0 ? listOfPosts.map((post) => (<Post key={post} postID={post} />)) : <NoResults/>}
    </div>
  );

  function checkParams(param) {
    if(param.get('sortBy')){
      sortBy(param.get('sortBy'));
    }else if(param.get('likes')){
      getLikedPosts();
    }else if(param.get('technology')){
      searchTechnology(param.get('technology'));
    }else if(param.get('category')){
      getByCategory(param.get('category'));
    }else if(param.get('postID')){
      setListOfPosts([param.get('postID')]);
    }else{
      getDefault();
    }
  }

  function searchTechnology(technology){
    axios.post(process.env.REACT_APP_API + "/posts/search", { pageNum: 1, technology }).then((response) => {
      handleResults(response.data);
    });
  }
  function sortBy(sortBy){
    axios.post(process.env.REACT_APP_API + "/posts/sort", { pageNum: 1, sortBy }).then((response) => {
      handleResults(response.data);
    });
  }
  function getLikedPosts(){
    axios.post(process.env.REACT_APP_API + "/posts/liked", { pageNum: 1 }, {withCredentials: true}).then((response) => {
      handleResults(response.data);
    });
  }
  function getByCategory(category){
    axios.post(process.env.REACT_APP_API + "/posts/category", { pageNum: 1, categoryID: category }, {withCredentials: true}).then((response) => {
      handleResults(response.data);
    });
  }
  function getDefault(){
    axios.post(process.env.REACT_APP_API + "/posts/default", { pageNum: 1 }).then((response) => {
      handleResults(response.data);
    });
  }


  function handleResults(results){
    if(results.error){
      console.log("Error: ", results.errorMessage);
    }else{
      setListOfPosts(results);
    }
  }
}

export default PostList;
