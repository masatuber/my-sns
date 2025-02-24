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
          ? await axios.get(`/api/posts/profile/${username}`) //プロフィールの場合のAPI
          : await axios.get(`/api/posts/timeline/${user._id}`); //Homeの場合「タイムライン」
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
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
