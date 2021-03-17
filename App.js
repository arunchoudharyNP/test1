import React from "react";

import { Provider } from "react-redux";
import { combineReducers, createStore ,applyMiddleware } from "redux";
import productReducers from "./store/reducers/Product";
import cartReducers from "./store/reducers/Cart";
import orderReducers from "./store/reducers/Orders";
import ReduxThunk from "redux-thunk";
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  Products: productReducers,
  Cart: cartReducers,
  Orders: orderReducers,
  Auth : authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
