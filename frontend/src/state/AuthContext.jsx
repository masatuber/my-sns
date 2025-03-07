import {  createContext, useEffect,  useReducer, } from "react";
import { AuthReducer } from "./AuthReducer";

//最初のユーザー状態を定義する
const initialState = {
  user: JSON.parse(localStorage.getItem("user") || null), //.getItem("user") || null)で正しい
  isFetching: false,
  error: false,
  // user: {
  //   _id: "679f565bae953bd2036421df",
  //   username: "tanaka",
  //   email: "fight_for-liberty6pridegravity@ezweb.ne.jp",
  //   password: "123456",
  //   profilePicture: "/person/1.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
};

//ユーザー状態をグローバルに管理するContextを作成する
  export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
  
  //AuthContext = createContext(initialState);と<AuthContext.Providerは一致していないとエラーが発生する
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//DBのユーザーを張付けてログイン状態から作業開始すると開発しやすくなる
