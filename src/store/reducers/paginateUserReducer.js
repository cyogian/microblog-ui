import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  dataSource: [],
  error: null,
  loading: false,
  activePage: 1,
  totalPages: 1,
  totalItems: 0,
  refresh: false,
};

const fetchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    activePage: action.activePage,
    refresh: false,
  });
};

const fetchSuccess = (state, action) => {
  const { data } = action;
  return updateObject(state, {
    dataSource: data.items,
    totalPages: data._meta.total_pages,
    totalItems: data._meta.total_items,
    error: null,
    loading: false,
    refresh: false,
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    refresh: false,
  });
};

const fetchReset = (state, action) => {
  return updateObject(state, {
    dataSource: [],
    error: null,
    loading: false,
    activePage: 1,
    totalPages: 1,
    totalItems: 0,
    refresh: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_FETCH_START:
      return fetchStart(state, action);

    case actionTypes.USER_FETCH_SUCCESS:
      return fetchSuccess(state, action);

    case actionTypes.USER_FETCH_FAIL:
      return fetchFail(state, action);

    case actionTypes.USER_FETCH_RESET:
      return fetchReset(state, action);

    case actionTypes.REFRESH_USERS:
      return { ...state, refresh: true };

    default:
      return state;
  }
};

export default reducer;
