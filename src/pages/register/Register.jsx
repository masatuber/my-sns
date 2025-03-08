import { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //パスワードと確認用のパスワードが一致しているかチェック
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity(
        "パスワードが一致しません"
      );
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        //auth/registerのAPIを呼出す /api/auth/register
        await axios.post("api/auth/register", user);
        navigate("/login");
      } catch (err) {
        alert(err);
      }
    }
  };
  //↑までがhandleSubmit関数のスコープ


  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">ニュースながらSNS</h3>
            <span className="loginDesc">新感覚のSNS</span>
            <Link to="/login">
              <button>アカウントがある場合はこちら</button>
            </Link>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
              <p className="loginMsg">新規登録はこちらです</p>

              <input
                type="text"
                className="loginInput"
                placeholder="ユーザー名"
                ref={username}
                required
              />

              <input
                type="email"
                className="loginInput"
                placeholder="Eメール"
                ref={email}
                required
              />

              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                ref={password}
                required
                minLength={"5"}
              />

              <input
                type="password"
                className="loginInput"
                placeholder="確認用パスワード"
                ref={passwordConfirmation}
                required
                minLength={"5"}
              />

              <button className="loginButton" type="submit">
                サインアップ
              </button>

              <button className="loginRegisterButton">ログイン</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
