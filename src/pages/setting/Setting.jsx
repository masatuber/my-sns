//import React fro//m 'react'
import axios from "axios";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./setting.css";
import { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";
//import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export default function Setting() {
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    //アカウント削除API呼出す

    if (!window.confirm("本当にこのアカウントを削除してもよろしいですか？"))
      return;
    //削除確認用のダイアログ
    try {
      //削除のAPIを呼出す
      await axios.delete(`api/users/${user._id}`, {
        data: {userid: user._id}
      });
      window.alert("アカウントを削除しました");
      localStorage.clear();
      //  window.location.reload();

    } catch (err) {
      window.alert("アカウント削除に失敗しました:", err);
    }
    
  }
 

  return (
    <>
      <Topbar />
      <div className="setting">
        <Sidebar />
        <div className="accountDelete">
          <span className="settingText">ユーザー設定ページ</span>
          <br />
          <br />
          <button className="accountDeleteButton" onClick={handleDeleteAccount}>
            アカウント削除しますか？
          </button>
        </div>
        <Rightbar />
      </div>
    </>
  );  
}
