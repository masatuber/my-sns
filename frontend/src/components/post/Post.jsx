import "./Post.css";
import { useContext, useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
// import { Users } from "../../dummyData";
// import PropTypes from "prop-types";eslintはoff
//timelineのpostをプロップスでPost.jsxにプロップスを介して受け取った{ post }をpost.useridにエンドポイントを付与する
export default function Post({ post }) {
  const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const { user: loginUser } = useContext(AuthContext);
  // const user = Users.filter((user) => user.id === 1);
  // console.log(user[0].username);
  const [like, setLike] = useState(post.likes.length); //いいね状態はダミーデータより開始
  const [isLiked, setIsLiked] = useState(false); //いいねボタンがclickされているかの状態管理
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `api/users?userid=${post.userid}`
      );
      setUser(response.data);
      // console.log(response.data);
    };
    fetchUser();
  }, [post.userid]);

  //いいねボタンがtriggerされる関数定義
  const handleLike = async () => {
    try {
      //イイねのAPIを呼出す  /:id/like
      await axios.put(`api/posts/${post._id}/like`, {
        userid: loginUser._id,
      });
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  //filter((user) => user.id === post.id)[0].
  //s.filter((user) => user.id === post.id)[0].
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  src={
                    user.profilePicture 
                    ? PUBLIC_FOLDER + user.profilePicture 
                    : PUBLIC_FOLDER + "person/noAvatar.png"
                  }
                  alt=""
                  className="postProfileImg"
                />
              </Link>
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                src={PUBLIC_FOLDER + "heart.png"}
                alt=""
                className="likeIcon"
                onClick={() => handleLike()}
              />
              <span className="postLikeCounter">
                {like}人がいいねを押しました
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment}:コメント</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// PropTypes の定義
// Post.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     desc: PropTypes.string.isRequired,
//     photo: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     userId: PropTypes.number.isRequired,
//     like: PropTypes.number.isRequired,
//     comment: PropTypes.number.isRequired,
//   }).isRequired,
// };