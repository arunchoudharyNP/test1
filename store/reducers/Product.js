import PRODUCTS from "../../data/dummy-data";
import {
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  SET_PRODUCTS,
  
} from "../actions/Product";
import Product from "../../models/Product";

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, actions) => {
  switch (actions.type) {
   case SET_PRODUCTS:
      const UID = actions.userId;
      return {
        userProducts: actions.userProducts,
        availableProducts: actions.products
      }

    case EDIT_PRODUCT:
      console.log("action received");
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === actions.Id
      );
      const userProduct = new Product(
        actions.Id,
        state.userProducts[productIndex].ownerId,
        actions.title,
        actions.image,
        actions.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = userProduct;

      const availableProductsIndex = state.availableProducts.findIndex(
        prod => prod.id === actions.Id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductsIndex] = userProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProduct
      };

    case DELETE_PRODUCT:
      console.log("inside Delete");

      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          prod => prod.id != actions.pid
        ),
        userProducts: state.userProducts.filter(prod => prod.id != actions.pid)
      };

    case ADD_PRODUCT:
      console.log("Inside ADD Product");

      const newProduct = new Product(
        actions.product.id,
        actions.product.ownerId,
        actions.product.title,
        actions.product.image,
        actions.product.description,
        actions.product.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts : state.userProducts.concat(newProduct)
      };
  }

  return state;
};
