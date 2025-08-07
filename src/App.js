import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import "./scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./hoc/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";

const loading = (
  <div className="appLoader">
    <div className="appLoaderContainer">
      <img src="/logo.png" alt="logo" className="appLoaderContainerIcon" />
    </div>
  </div>
);

const App = (props) => {
  //container
  const TheLayout = React.lazy(() => import("./bucket/TheLayout"));

  return (
    <React.Suspense fallback={loading}>
      <Router>
        {" "}
        <PrivateRoute
          path="/"
          render={TheLayout}
        />{" "}
      </Router>
    </React.Suspense>
  );
};
export default App;
