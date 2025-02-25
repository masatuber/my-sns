import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

const HomeRightbar = ( ) => {
  return (
    <>
      <div className="eventContainer">
        <img src={PUBLIC_FOLDER + "/star.png"} alt="" className="starImg" />
        <span className="eventText">
          <b>フォローワー限定</b>イベント開催中!
        </span>
      </div>
      <img src={PUBLIC_FOLDER + "/event.jpeg"} alt="" className="eventImg" />
      <h4 className="rightbarTitle">オンラインの友達</h4>
      <ul className="rightbarFriendList">
        {Users.map((user) => (
          <Online user={user} key={user.id} /> //Onlineコンポーネントにuserを渡し、JSのmap関数でUsersの配列を展開
        ))}
      </ul>
      <p className="promotionTitle">プロモーション広告</p>
      <img
        src={PUBLIC_FOLDER + "/promotion/promotion1.jpeg"}
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">ショッピング</p>
      <img
        src={PUBLIC_FOLDER + "/promotion/promotion2.jpeg"}
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">カーショップ</p>
      <img
        src={PUBLIC_FOLDER + "/promotion/promotion3.jpeg"}
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">・株式会社</p>
    </>
  );
}

const ProfileRightbar = ( ) => {
  return (
    <>
      <h4 className="rightbarTitle">ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身:</span>
          <span className="rightbarInfoKey">福岡:</span>
        </div>
        <h4 className="rightbarTitle">あなたの友達</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Shin Code</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/2.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">田中</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/3.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">佐藤</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PUBLIC_FOLDER + "/person/4.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">佐々木</span>
          </div>
        </div>
      </div>
    </>
  );  
};

//条件分岐用のJSXで、ProfileがtrueならProfileRightbarを表示、そうでないならHomeRightbarを表示
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

// {Users.map(( ) => (
// <component プロップス={プロップス} 
// key={user.id}/> キーがないとerrorになる
//          )  )  }
