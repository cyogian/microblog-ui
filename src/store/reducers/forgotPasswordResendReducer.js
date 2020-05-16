import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  loading: false,
  error: null,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_PASSWORD_RESEND_START:
      return updateObject(state, {
        loading: true,
        error: null,
      });
    case actionTypes.FORGOT_PASSWORD_RESEND_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
      });
    case actionTypes.FORGOT_PASSWORD_RESEND_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });
    case actionTypes.FORGOT_PASSWORD_RESEND_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
