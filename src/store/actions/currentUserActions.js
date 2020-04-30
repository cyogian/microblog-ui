import axios from "../../axios";
import * as actionTypes from "./actionTypes";

export const setCurrentUser = (userData) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    userData,
  };
};

export const getCurrentUser = (token) => {
  return (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/users/current", config)
      .then((response) => {
        const userData = response.data;
        dispatch(setCurrentUser(userData));
      })
      .catch((error) => {
        console.log("[GET CURRENT USER]", error);
      });
  };
};

export const refreshCurrentUser = () => {
  return {
    type: actionTypes.REFRESH_CURRENT_USER,
  };
};
