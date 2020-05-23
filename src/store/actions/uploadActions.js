import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { setCurrentUser } from "./currentUserActions";

const uploadStart = () => {
  return {
    type: actionTypes.UPLOAD_START,
  };
};
const uploadSuccess = () => {
  return {
    type: actionTypes.UPLOAD_SUCCESS,
  };
};
const uploadFail = (error) => {
  return {
    type: actionTypes.UPLOAD_FAIL,
    error,
  };
};
export const uploadReset = () => {
  return {
    type: actionTypes.UPLOAD_RESET,
  };
};
export const upload = (formData, token) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    dispatch(uploadStart());
    axios
      .post("/users/upload_image", formData, config)
      .then((res) => {
        if (res.data && res.data.success) {
          dispatch(uploadSuccess());
          dispatch(setCurrentUser(res.data.userData));
        } else {
          dispatch(uploadFail("Unknown Error"));
        }
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response.data) {
          error = err.response.data.message;
        }
        dispatch(uploadFail(error));
      });
  };
};
