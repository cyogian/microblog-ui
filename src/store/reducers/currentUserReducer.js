import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  userData: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return updateObject(state, { userData: action.userData, refresh: false });
    case actionTypes.REFRESH_CURRENT_USER:
      return updateObject(state, { refresh: true });
    default:
      return state;
  }
};

export default reducer;
