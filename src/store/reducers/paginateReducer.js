import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  dataSource: [],
  error: null,
  loading: false,
  activePage: 1,
  totalPages: 1,
  totalItems: 0,
};

const fetchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    activePage: action.activePage,
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
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
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
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return fetchStart(state, action);

    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state, action);

    case actionTypes.FETCH_FAIL:
      return fetchFail(state, action);

    case actionTypes.FETCH_RESET:
      return fetchReset(state, action);

    default:
      return state;
  }
};

export default reducer;
