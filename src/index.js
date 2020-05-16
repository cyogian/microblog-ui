// React imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// redux Imports
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import authReducer from "./store/reducers/authReducer";
import currentUserReducer from "./store/reducers/currentUserReducer";
import paginatePostReducer from "./store/reducers/paginatePostReducer";
import paginateUserReducer from "./store/reducers/paginateUserReducer";
import userReducer from "./store/reducers/userReducer";
import editProfileReducer from "./store/reducers/editProfileReducer";
import updateEmailReducer from "./store/reducers/updateEmailReducer";
import updateEmailResendReducer from "./store/reducers/updateEmailResendReducer";
import updateEmailVerifyReducer from "./store/reducers/updateEmailVerifyReducer";
import createUserReducer from "./store/reducers/createUserReducer";
import createUserResendReducer from "./store/reducers/createUserResendReducer";
import createUserVerifyReducer from "./store/reducers/createUserVerifyReducer";
import forgotPasswordReducer from "./store/reducers/forgotPasswordReducer";
import forgotPasswordResendReducer from "./store/reducers/forgotPasswordResendReducer";
import forgotPasswordVerifyReducer from "./store/reducers/forgotPasswordVerifyReducer";

// CSS Imports
import "semantic-ui-css/semantic.min.css";
import "./index.css";

// General Imports
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

let middleware = composeEnhancers(applyMiddleware(thunk));
if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware(thunk);
}

const rootReducer = combineReducers({
  auth: authReducer,
  currentUser: currentUserReducer,
  paginatePost: paginatePostReducer,
  paginateUser: paginateUserReducer,
  user: userReducer,
  profile: editProfileReducer,
  updateEmail: updateEmailReducer,
  updateEmailResend: updateEmailResendReducer,
  updateEmailVerify: updateEmailVerifyReducer,
  createUser: createUserReducer,
  createUserResend: createUserResendReducer,
  createUserVerify: createUserVerifyReducer,
  forgotPassword: forgotPasswordReducer,
  forgotPasswordResend: forgotPasswordResendReducer,
  forgotPasswordVerify: forgotPasswordVerifyReducer,
});

const store = createStore(rootReducer, middleware);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
