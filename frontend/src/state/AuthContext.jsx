import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
//最初のユーザー状態を定義する
const initialState = {
  // user: null,
  user: {
  _id: "679cae5c516ff4a95dc3f26c",
  username: "masaki",
  email: "uvervivid1231@icloud.com",
  password: "abcdef",
  profilePicture: "/person/1.jpeg",
  coverPicture: "",
  followers: [],
  followings: [],
  isAdmin: false,
  },
  isFetching: false,
  error: false,
};

//ユーザー状態をグローバルに管理するContextを作成する 
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
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
