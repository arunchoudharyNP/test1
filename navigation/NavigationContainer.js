import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./shopNavigator";

const NavigationContainer = props => {
  const navRef = useRef();

  const isAuth = useSelector(state => !!state.Auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
