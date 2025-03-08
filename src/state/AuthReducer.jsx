export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LoginStart":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LoginSuccess":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LoginError":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
  
};
