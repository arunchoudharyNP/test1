import React from "react";

import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-elements";
import * as OrderActions from "../../store/actions/Orders";
import * as CartActions from "../../store/actions/Cart";

import { CartProducts } from "../../components/CartProducts";

const CartItems = props => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.Cart.totalAmount);

  const product = useSelector(state => state.Products.availableProducts);

  const cartItems = useSelector(state => {
    const mapCartItems = [];
    for (const key in state.Cart.item) {
      mapCartItems.push({
        productId: key,
        title: state.Cart.item[key].productTitle,
        price: state.Cart.item[key].productPrice,
        quantity: state.Cart.item[key].quantity,
        sum: state.Cart.item[key].sum,
        imageUrl: state.Cart.item[key].imageUrl
      });
    }

    return mapCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const buttonStyle = {
    borderRadius: 10
  };

  return (
    <View style={styles.cartContainer}>
      <View style={styles.summaryText}>
        <Text style={styles.amountText}>
          Total Amount:
          <Text style={styles.amount}> ${totalAmount.toFixed(2)}</Text>
        </Text>

        <Button
          title="Order Now"
          buttonStyle={buttonStyle}
          type="outline"
          onPress={() => {
            dispatch(OrderActions.addOrders(cartItems, totalAmount));
          }}
        />
      </View>

      <View style={styles.list}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartProducts
              productsData={itemData}
              image={
                product.find(prod => prod.id === itemData.item.productId)
                  .imageUrl
              }
              id={itemData.item.productId}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {},
  summaryText: {
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 15
  },
  amount: {
    color: "orange"
  },
  amountText: {
    fontSize: 17,
    color: "black",
    textAlignVertical: "center"
  },
  button: {
    borderRadius: 10,
    color: "orange",
    borderWidth: 1
  },
  list: {
    height: "80%"
  }
});

export default CartItems;
