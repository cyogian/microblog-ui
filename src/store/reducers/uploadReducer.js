import * as actionTypes from "../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_START:
      return { success: false, loading: true, error: null };

    case actionTypes.UPLOAD_SUCCESS:
      return { success: true, loading: false, error: null };

    case actionTypes.UPLOAD_FAIL:
      return { success: false, loading: false, error: action.error };

    case actionTypes.UPLOAD_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
