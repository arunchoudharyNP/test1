import React from "react";

import { View, Text, StyleSheet, Image, Button } from "react-native";

import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as CartActions from "../store/actions/Cart";


export const CartProducts = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <Text style={styles.title}> {props.productsData.item.title}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleBox}>
          {" "}
          Quantity : {props.productsData.item.quantity}
        </Text>
        <Text style={styles.titleBox}>
          {" "}
          Price : $ {props.productsData.item.price}
        </Text>
       
      </View>
      <View style={styles.delete}>
        <IconButton
          icon="delete"
          color="red"
          size={21}
          onPress={() => {
            dispatch(CartActions.removeFromCart(props.id));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    elevation: 10,
    height: 150,
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center"
  },

  titleBox: {
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 20
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "70%",
    borderWidth: 0.5,
    borderColor: "grey"
  },
  imageContainer: {
    flexBasis: "40%",
    padding: 10
  },
  textContainer: {
    flexBasis: "40%"
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600"
  },
  delete: {
    flexBasis: "20%",
    alignItems: "flex-end"
  }
});

export default CartProducts;
