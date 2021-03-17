import Order from "../../models/Orders";

export const ADD_ORDERS = "ADD_ORDERS";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const addOrders = (cartItems, totalAmount) => {
  const date = new Date();
  return async (dispatch,getState) => {
    
    const userId =getState().Auth.userId;
    const token = getState().Auth.token;
    const response = await fetch(
      `https://skratcha-34f71.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",

        headers: {
          contentType: "application/json"
        },

        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    const resData = await response.json();
    console.log("response................"+JSON.stringify( response) +"............................");
    console.log("resData in Orders................"+JSON.stringify(resData) +"............................");
    console.log("resData name................"+resData.name +"............................");
    console.log("resData amount................"+resData.totalAmount +"............................");

    dispatch({
      type: ADD_ORDERS,
      orderData: {
        id: resData.name,
        pItems: resData.cartItems,
        amount: resData.totalAmount,
        date: resData.date
      }
    });
  };
};


export const fetchOrders = () =>{
  
    return async (dispatch,getState) => {
        //write Async code
    
        const userId =getState().Auth.userId;
        const token = getState().Auth.token;

        const response = await fetch(
          `https://skratcha-34f71.firebaseio.com/orders/${userId}.json`
        );
        const resData = await response.json();
       const a = JSON.stringify(response);
        const loadedOrders = [];

        console.log("orders  .."+a);
        console.log(" my orders.............."+resData);
        for (const key in resData) {
          loadedOrders.push(
            new Order(
              key,
              resData[key].cartItems,
              resData[key].totalAmount,
              resData[key].date,
            )
          );
          
        }
        console.log(loadedOrders);
        dispatch({ type: FETCH_ORDERS, Orders: loadedOrders });
      };

}
