import React, { useState, useEffect } from "react";
import classes from "./post.module.css";
import axios from "axios";
import PostHeader from "./postHeader";
import PostMain from "./postMain";
import CategoryBar from "./categoryBar";
import PostTech from "./postTech"
import PostInteractions from "./postInteractions";

export const PostContext = React.createContext();

function Post(props) {
  const [postData, setPostData] = useState(null);
  const [postUpToDate, setPostUpToDate] = useState(true);


  // Get user info from userID
  useEffect(() => {
    axios.post(process.env.REACT_APP_API + "/posts/post", { postID: props.postID }).then((response) => {
      setPostData(response.data);
    });
  }, [props.postID, postUpToDate]);

  return (
    <PostContext.Provider value={{postUpToDate, setPostUpToDate}}>
      <div className={classes.post}>
        { postData !== null ? <>
        <PostHeader userID={postData.userID} postID={postData._id} timestamp={postData.timestamp}/>
        <CategoryBar postCategory={postData.category}/>
        <PostMain postImage={postData.imageURL} postTitle={postData.title} postDesc={postData.description} />
        <PostTech postTech={postData.technologies}/>
        <PostInteractions postLikes={postData.likes} postLikesCount={postData.likesCount} postID={postData._id} />
        </> : null}
      </div>
    </PostContext.Provider>
  );
}

export default Post;
