import { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch} = useContext(AuthContext);
  //formタグのonSubmitが使える
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);
    loginCall({
        email: email.current.value,
        password: password.current.value,
      }, dispatch
    );
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">単機能なSNS</h3>
            <span className="loginDesc">新しいSNS</span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
              <p className="loginMsg">ログインページはこちらです</p>
              <input
                type="email"
                className="loginInput"
                placeholder="Eメール"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                required
                minLength={"6"}
                ref={password}
              />
              <button className="loginButton">ログイン</button>
              <span className="loginForgot">
                パスワードを忘れた場合はこちら
              </span>
              <button className="loginRegisterButton">アカウントを作成</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
