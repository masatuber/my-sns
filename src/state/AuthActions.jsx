//ユーザー入力に応じたアクションの定義設定
export const LoginStart = (user) => ({
  type: "LoginStart",
  payload: user,
});

export const LoginSuccess = (user) => ({
  type: "LoginSuccess",
  payload: user,
});

export const LoginError = (error) => ({
  type: "LoginError",
  payload: error,
});
//LOGIN_SUCCESS