import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  loadingApp: true,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    username: action.username,
    error: null,
    loading: false,
    loadingApp: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loadingApp: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
    loadingApp: false,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const authReset = (state, action) => {
  return updateObject(state, { error: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    case actionTypes.AUTH_RESET:
      return authReset(state, action);

    default:
      return state;
  }
};

export default reducer;
