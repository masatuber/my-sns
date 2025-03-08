import axios from "axios";
import { LoginStart, LoginSuccess, LoginError } from "./state/AuthActions";

export const loginCall = async (user, dispatch) => {

  dispatch( LoginStart(user) );
  try {
     const response = await axios.post("api/auth/login", user);
     //エラーになる原因はuserを取得➡response変数.dataで全体のJSON取得出来る
    dispatch( LoginSuccess(response.data) );
    
  } catch (err) {
    dispatch( LoginError(err) );
  }
};
