import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  loading: false,
  error: null,
  success: false,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_PASSWORD_VERIFY_START:
      return updateObject(state, {
        loading: true,
        error: null,
        success: false,
      });
    case actionTypes.FORGOT_PASSWORD_VERIFY_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        success: true,
      });
    case actionTypes.FORGOT_PASSWORD_VERIFY_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
        success: false,
      });
    case actionTypes.FORGOT_PASSWORD_VERIFY_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
