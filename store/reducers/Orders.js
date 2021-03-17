import { ADD_ORDERS, FETCH_ORDERS } from "../actions/Orders";
import Order from "../../models/Orders";
import { DELETE_PRODUCT } from "../actions/Product";

const initialState = {
  orders: []
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_ORDERS:
      
    const items = actions.orderData.pItems;
      const totalAmount = actions.orderData.amount;

      const newOrder = new Order(
        actions.orderData.id,
        items,
        totalAmount,
        actions.orderData.date
      );

      return { ...state.orders, orders: state.orders.concat(newOrder) };


      case FETCH_ORDERS :

      return {
        ...state.orders,
        orders : actions.Orders
      }
  }

  return state;
};
