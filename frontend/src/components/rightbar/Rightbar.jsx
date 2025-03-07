import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { useEffect, useState} from "react";

export default function  Rightbar({ user }) {
  const PUBLIC_FOLDER = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  //ニュースデータの保持用のステート
  const [newsData, setNewsData] = useState([]);
  //https://newsapi.org/v2/everything?q=テクノロジー&apiKey=294869a8c9ff49d3845198fc1da1e10d

  // useEffect(() => {
  //   fetchNews();
  // }, []);
  const hendleGet = () => {
    const fetchNews = async () => {
      const API_KEY = "294869a8c9ff49d3845198fc1da1e10d";
      
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            q: "テクノロジー", // 検索キーワード
            // 言語を日本語に指定language: "en",
            // country: "ja",
            //pageSize: 5,
            apiKey: API_KEY,
          },
        });
        console.log(response.data);

         if (response.status === 200) {
        const articles = response.data.articles ?? [];
        setNewsData(articles);
         }
      } catch (error) {
        console.error("エラーが発生しました", error);
      }
    };
    fetchNews();
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <button onClick={hendleGet}> ニュースデータ取得</button>
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

        {/* ニュースデータが存在する場合にレンダリング */}
        {newsData.length > 0 && (
          <div className="newsSection">
            <h4 className="rightbarTitle">最新テクノロジーニュース</h4>
            <ul className="newsList">
              {newsData.map((article, index) => (
                <li key={index} className="newsItem">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title || article.description || "タイトルなし"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  const ProfileRightbar = () => {
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
