import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  loading: false,
  error: null,
  data: null,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START:
      return updateObject(state, {
        loading: true,
        data: null,
        error: null,
      });
    case actionTypes.CREATE_USER_SUCCESS:
      return updateObject(state, {
        loading: false,
        data: action.data,
        error: null,
      });
    case actionTypes.CREATE_USER_FAIL:
      return updateObject(state, {
        loading: false,
        data: null,
        error: action.error,
      });
    case actionTypes.CREATE_USER_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
