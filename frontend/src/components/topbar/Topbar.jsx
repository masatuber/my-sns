import "./Topbar.css";
import { Chat, Notifications, Search } from "@mui/icons-material"; //チャット、ベル
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
export default function Topbar() {
  const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">単機能なSNS</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="探しものは何ですか？"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarItemIcons">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">2</span>
            </div>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
//"/assets/person/1.jpeg"
