import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import "./Share.css";

export default function Share() {
  const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={
                PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder="今何してるの？"
            />
          </div>
          <hr className="shareHr" />
          <div className="shareButtons">
            <div className="shareOptions">
              <div className="shareOption">
                <Image className="shareIcon" htmlColor="green" />
                <span className="shareOptionText">写真</span>
              </div>
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
            <button className="shareButton">投稿</button>
          </div>
        </div>
      </div>
    </>
  );
}
