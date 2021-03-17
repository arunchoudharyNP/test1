export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/Product";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    //write Async code

    const userId = getState().Auth.userId;
    const response = await fetch(
      "https://skratcha-34f71.firebaseio.com/products.json"
    );
    const resData = await response.json();

    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].image,
          resData[key].description,
          resData[key].price
        )
      );
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId===userId)
    });
  };
};

export const editProduct = (Id, title, description, image) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.token;
    await fetch(
      `https://skratcha-34f71.firebaseio.com/products/${Id}.json?auth=${token}`,
      {
        method: "PATCH",

        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
        }),
      }
    );

    dispatch({ type: EDIT_PRODUCT, Id, title, description, image });
  };
};

export const deleteProduct = (Id) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.token;
    try {
      await fetch(
        `https://skratcha-34f71.firebaseio.com/products/${Id}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: DELETE_PRODUCT, pid: Id });
  };
};

export const addProduct = (title, description, image, price) => {
  return async (dispatch, getState) => {
    //write Async code
    const userId = getState().Auth.userId;
    const token = getState().Auth.token;
    const response = await fetch(
      `https://skratcha-34f71.firebaseio.com/products.json?auth=${token}`,
      {
        method: "post",

        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: ADD_PRODUCT,
      product: {
        id: resData.name,
        title,
        description,
        image,
        price,
        ownerId: userId,
      },
    });
  };
};
