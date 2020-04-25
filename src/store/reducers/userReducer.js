import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  loading: false,
  error: null,
  userData: null,
  refresh: false,
};

const fetchStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    userData: null,
    error: false,
    refresh: false,
  });
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userData: action.userData,
    error: false,
    refresh: false,
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    userData: null,
    error: action.error,
    refresh: false,
  });
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.USER_FETCH_START:
      return fetchStart(state, action);

    case actionTypes.USER_FETCH_SUCCESS:
      return fetchSuccess(state, action);

    case actionTypes.USER_FETCH_FAIL:
      return fetchFail(state, action);

    case actionTypes.REFRESH_USER:
      return { ...state, refresh: true };

    case actionTypes.USER_FETCH_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
