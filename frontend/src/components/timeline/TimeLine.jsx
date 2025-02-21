import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./TimeLine.css";
import axios from "axios";
// import {Posts } from "../../dummyData";
// const response = await axios.get(
//   "/api/posts/timeline/679f672a206ee1902ecc06ec"
// );
export default function TimeLine({ username,  }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/api/posts/profile/${username}`)
          : await axios.get("/api/posts/timeline/679cae5c516ff4a95dc3f26c");
          
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
         console.error("Error fetching posts:", error);
         
      }
      
    };
    fetchPosts();
  }, [username]);
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
