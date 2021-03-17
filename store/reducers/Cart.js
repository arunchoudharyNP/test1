import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  
} from "../actions/Cart";

import { cart } from "../../models/Cart";
import { ADD_ORDERS } from "../actions/Orders";

const initialState = {
  item: {},
  totalAmount: 0
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_TO_CART:
      const cartProduct = actions.product;
      const price = cartProduct.price;
      const title = cartProduct.title;
      const imageUrl =cartProduct.imageUrl;
      let cartAddUpdateItem;

      if (state.item[cartProduct.id]) {
        cartAddUpdateItem = new cart(
          state.item[cartProduct.id].quantity + 1,
          price,
          title,
          state.item[cartProduct.id].sum + price,
          imageUrl
        );
      } else {
        cartAddUpdateItem = new cart(1, price, title, price,imageUrl);
      }
      return {
        ...state,
        item: { ...state.item, [cartProduct.id]: cartAddUpdateItem },
        totalAmount: state.totalAmount + price
      };

    case REMOVE_FROM_CART:
      const productId = actions.PID;
      const prod = state.item[productId];
      let updatedCartItems;
      if (prod.quantity > 1) {
        const updatedCartItem = new cart(
          prod.quantity - 1,
          prod.productPrice,
          prod.productTitle,
          prod.sum - prod.productPrice,
          imageUrl
        );
        updatedCartItems = { ...state.item, [productId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.item };
        delete updatedCartItems[productId];
      }
      return {
        ...state.item,
        item: updatedCartItems,
        totalAmount: state.totalAmount - prod.productPrice
      };

    case ADD_ORDERS:
      return initialState;
  }

  return state;
};
