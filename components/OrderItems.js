import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, FlatList } from "react-native";

import CartProducts from "./CartProducts";
import OrderList from "./OrderList";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color="orange"
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />

      {showDetails  &&  <FlatList
        data={props.items}
        keyExtractor={item => item.title}
        renderItem={itemData => (
            <OrderList imageUrl={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} quantity={itemData.item.quantity}   />
        )}
      />}
    
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
    flex:1
    
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontSize: 16
  },
  date: {
    fontSize: 16,

    color: "#888"
  },
  detailItems: {
    width: "100%"
  }
  
});

export default OrderItem;
