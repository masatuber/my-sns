import "./TimeLine.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext"
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
// import {Posts } from "../../dummyData";

export default function TimeLine({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {

       try {
         const res = username
           ? await axios.get(`api/posts/profile/${username}`) //プロフィールの場合のAPI
           : await axios.get(`api/posts/timeline/${user._id}`); //Homeの場合「タイムライン」
         console.log(res.data);
         //sortで投稿を並び変える
         setPosts(
           res.data.sort((p1, p2) => {
             return new Date(p2.createdAt) - new Date(p1.createdAt);
           })
         );
         // setPosts(res.data)
       } catch (error) {
        console.error("エラーメッセージ", error);
      };
    // );
  
    // } catch (error) {
    //   console.error("エラーメッセージ", error);
    // }
    };

      fetchPosts();
    
  }, [username, user._id]);

  return (
    <>
      <div className="timeline">
        <div className="timelineWrapper">
          <Share />
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
}
// sort((post1, post2) => {
//   return new Date(post2.createdAt) - new Date(post1.createdAt);
// });