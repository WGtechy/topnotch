// import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const PrivateRoute = ({ render: Component, ...rest }) => {
  const [token, setToken] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const { user, token: newToken } = useSelector((state) => state.signIn);
  // //Here im taking one of the props value from the PrivateRoute
  const { accountId } = rest;
  useEffect(() => {
    let x = localStorage.getItem("token");
    let y = localStorage.getItem("user");
    if (![null, undefined].includes(x)) {
      setToken(x);
      setAccount(user?._id ? user : JSON.parse(y));
    } else {
      setAccount(user);
      setToken(newToken);
    }
  }, [newToken, user]);
  const componentProps = useMemo(
    () => ({
      accountId,

      account: user?._id ? user : account,
      token: token || newToken,
      ...rest,
    }),
    [accountId, account, token, user, newToken, rest]
  );

  return (
    <Route
      {...rest}
      render={function (props) {
        return <Component {...props} {...componentProps} />;
      }}
    />
  );
};

export default PrivateRoute;
