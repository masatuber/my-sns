import "./TimeLine.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext"
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
// import {Posts } from "../../dummyData";

export default function TimeLine({ username,  }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   
      if (!user) {
       window.alert("ユーザーIDが取得できていません");
       console.error("ユーザーIDが取得できていません");
       return; // APIリクエストを実行しない
     }
    console.log("AuthContextのuser:", user);
    const fetchPosts = async () => {
      try {
        //プロフィールの場合のAPI
        const res = username
          ? await axios.get(`api/posts/profile/${username}`)
          : await axios.get(`api/posts/timeline/${user._id}`);
        //Homeの場合「タイムライン」
        // console.log("APIレスポンス:", res.data); // デバッグ用

         if (Array.isArray(res.data)) {

        setPosts(
          res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
          )
        );

        } else {
            console.error("取得したデータが配列ではありません:", res.data);
          }
      } catch (error) {
        window.alert("エラーメッセージ", error);
      }
    };
    fetchPosts();
  }, [username, user]);
//依存配列に全体のグローバルuserを監視するように変更
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