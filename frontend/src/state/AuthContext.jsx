import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
//最初のユーザー状態を定義する
const initialState = {
  // user: null,
  user: JSON.parse(localStorage.getItem("user") || null),
  isFetching: false,
  error: false,
  
};

//ユーザー状態をグローバルに管理するContextを作成する 
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //useEffectがstate.userにログインしている値が入力されている時は発火し、ローカルストレージに保存する記述
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

// user: {
  // _id: "",
  // username: "",
  // email: "",
  // password: "",
  // profilePicture: "/person/1.jpeg",
  // coverPicture: "",
  // followers: [],
  // followings: [],
  // isAdmin: false,
  // }, DBのユーザーを張付けてログイン状態から作業開始すると開発しやすくなる

  // const [user, setUser] = useState(() => {
//     const StoredUser = localStorage.getItem("user");
//     return StoredUser ? JSON.parse(StoredUser) : null;
//   });