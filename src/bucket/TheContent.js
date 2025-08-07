import React, { Suspense, useCallback } from "react";
import { Switch } from "react-router-dom";
import { authRoutes, generalRoutes } from "../routes";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "../hoc/PrivateRoute";
import { componentLoader } from "./loading-components/componentLoader";

const loading = componentLoader;

const TheContent = ({
  account,
  token,
  
  accountId,
  currency,
  openMobileMenu,
  appData,
      propertyFeatures,
  isMobile,
  currencies,
  locations,
  buildingCategories,
  taxRate,
  autoCategories,
  cartCount,
  isAdmin,
  isStaff,
  manager,
  advert,
}) => {
  let routes = useCallback(() => {
    if (token) {
      return authRoutes;
    } else if (!token) {
      return generalRoutes;
    }
  }, [token]);

  return (
    <div className={token ? "container-fluid" : "container-fluid-no-account"}>
      <ToastContainer />
      <Suspense fallback={loading}>
        <Switch>
          {routes().map((route, idx) => {
            return (
              route.component && (
                <PrivateRoute
                  account={account}
                  autoCategories={autoCategories}
                  buildingCategories={buildingCategories}
                  appData={appData}
                  propertyFeatures={propertyFeatures }
                  locations={locations}
                  advert={advert}
                  isMobile={isMobile}
                  isStaff={isStaff}
                  cartCount={cartCount}
                  currencies={currencies}
                  taxRate={taxRate}
                  manager={manager}
                  accountId={accountId}
                  isAdmin={isAdmin}
                  openMobileMenu={openMobileMenu}
                  currency={currency}
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={route.component}
                />
              )
            );
          })}
          {/* <Redirect to="/" /> */}
        </Switch>
      </Suspense>
    </div>
  );
};

export default React.memo(TheContent);
