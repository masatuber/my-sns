import axios from "axios";
import { LoginStart, LoginSuccess, LoginError} from "./state/AuthActions";
export const loginCall = async (user, dispatch) => {
  dispatch(LoginStart(user));
  try {
    const response = await axios.post("/auth/login", user);
    dispatch(LoginSuccess(user));
  } catch (err) {
    dispatch(LoginError(err));
  }
};