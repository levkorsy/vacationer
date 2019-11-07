const initState = {
  isLoggedIn: false,
  currentUser: null,
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.errorMsg
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
        currentUser: action.response.data.currentUser,
        isLoggedIn: true
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
        authError: null
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.response.data.currentUser,
        authError: null
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
        authError: action.error.message
      };
    default:
      return state;
  }
};

export default authReducer;
