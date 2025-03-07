import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import "./Share.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export default function Share() {
  const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);
  //console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    ///postsのAPIに含めるデータ
    const newPost = {
      userid: user._id,
      desc: desc.current.value,
    };
    console.log(user._id);
    if (file) {
      const data = new FormData(); //キーとvalueを作成
      const fileName = Date.now() + file.name; //現在時刻を使って重複を回避
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        //画像アップロード用のAPI呼ぶ
        await axios.post("api/upload", data);
      } catch (err) {
        console.log(err);
      }

    } 

    try {
      
      await axios.post("api/posts", newPost);
      await axios.post("api/posts", newPost);
      window.location.reload();
    } catch(err) {
      console.log(err);
    }

    try {
      await axios.post("api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png"
              }
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder="今何してるの？"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
            <div className="shareOptions">
              <label className="shareOption" htmlFor="file">
                <Image className="shareIcon" htmlColor="green" />
                <span className="shareOptionText">写真</span>
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareOption">
                <Gif className="shareIcon" htmlColor="blue" />
                <span className="shareOptionText">GIF</span>
              </div>
              <div className="shareOption">
                <Face className="shareIcon" htmlColor="red" />
                <span className="shareOptionText">気持ち</span>
              </div>
              <div className="shareOption">
                <Analytics className="shareIcon" htmlColor="palevioletred" />
                <span className="shareOptionText">投票</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// 294869a8c9ff49d3845198fc1da1e10d
