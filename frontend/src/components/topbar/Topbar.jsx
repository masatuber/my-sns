import { Chat, Notifications, Search } from "@mui/icons-material"; //チャット、ベル
import "./Topbar.css";
import { Link } from "react-router-dom";
export default function Topbar() {
    return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration: "none"}}>
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
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg"></img>
            </div>
        </div>
      </div>
    </>
  );
}
