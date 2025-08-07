import React from "react";
import ReactDOM from "react-dom";
import "./_base.scss";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
    <Router>
        <App /> 
    </Router>
      </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
