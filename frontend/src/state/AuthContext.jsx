import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
//最初のユーザー状態を定義する
const initialState = {
  user: null,
  isFetching: false,
  error: false,
  
};

//ユーザー状態をグローバルに管理する AuthReducer

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
  
      <AuthContextProvider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContextProvider>
    
  );
};

