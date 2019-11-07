import axios from "axios";

export const login = loginUser => {
  return (dispatch, getState) => {
    axios({
      method: "post",
      url: "/users/login",
      params: loginUser,
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json: true
    })
      .then(response => {
        sessionStorage.setItem("jwt", response.data.token);
        dispatch({ type: "LOGIN_SUCCESS", response });
      })
      .catch(error => {
        let errorMsg = error.response.data["error"];
        dispatch({ type: "LOGIN_ERROR", errorMsg });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    sessionStorage.removeItem("jwt");
    dispatch({ type: "LOGOUT_SUCCESS" });
  };
};

export const register = newUser => {
  return (dispatch, getState) => {
    axios({
      method: "post",
      url: "/users/addnew",
      params: newUser,
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json: true
    })
      .then(response => {
        
        sessionStorage.setItem("jwt", response.data.token);
        dispatch({ type: "REGISTER_SUCCESS", response });
      })
      .catch(error => {
        dispatch({ type: "REGISTER_ERROR", error });
      });
  };
};
