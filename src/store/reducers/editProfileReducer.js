import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  loading: false,
  error: null,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PROFILE_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return updateObject(state, { loading: false, error: null });
    case actionTypes.EDIT_PROFILE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
