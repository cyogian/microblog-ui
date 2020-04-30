import * as actionTypes from "./actionTypes";
import { setCurrentUser } from "./currentUserActions";
import axios from "../../axios";
import { refreshUser } from "./userActions";

const editProfileStart = () => {
  return {
    type: actionTypes.EDIT_PROFILE_START,
  };
};

const editProfileSuccess = () => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
  };
};

const editProfileFail = (error) => {
  return { type: actionTypes.EDIT_PROFILE_FAIL, error };
};

export const editProfile = (username, about_me, token) => {
  return (dispatch) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      data = {
        username,
        about_me,
      };
    dispatch(editProfileStart());
    axios
      .put("/users", data, config)
      .then((res) => {
        dispatch(editProfileSuccess());
        dispatch(setCurrentUser(res.data));
        dispatch(refreshUser());
      })
      .catch((err) => {
        let error = "Internal Server Error";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(editProfileFail(error));
      });
  };
};
