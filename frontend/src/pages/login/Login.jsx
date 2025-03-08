import { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
// import { LoginSuccess } from "../../state/AuthActions";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //useContextでAuthContextの値を取得 user, isFetching, error,
  const { dispatch } = useContext(AuthContext);
  //formタグのonSubmitが使える
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);
    await loginCall(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch
    );
  
  };
  

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">ニュースながらSNS</h3>
            <span className="loginDesc">新感覚のSNS</span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
              <p className="loginMsg">ログインページはこちらです</p>
              <input
                type="email"
                className="loginInput"
                placeholder="Eメール"
                required
                ref={emailRef}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                required
                minLength={"5"}
                ref={passwordRef}
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
