import React,{useCallback,useState,useEffect} from "react";

import { Text, FlatList ,View,StyleSheet ,ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import CartProducts from "../../components/CartProducts";
import OrderItems from "../../components/OrderItems";
import * as orderActions from "../../store/actions/Orders"

const OrderScreen = props => {

  
   const orders = useSelector(state => state.Orders.orders);
  
  const [isLoaded, setIsloaded] = useState(false);

  const loadOrders = useCallback(async () => {
    setIsloaded(true);
    await dispatch(orderActions.fetchOrders());
    setIsloaded(false);
  }, [dispatch, setIsloaded]);

  const dispatch =useDispatch();

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadOrders);
    return () => {
      willFocusSub.remove();
    };
  }, [loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [dispatch]);


  if (isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={18} color="black" />
      </View>
    );
  }

 
  if (orders.length ===0) {
    return (
      <View style={styles.centered}>
        <Text>No Order founds. Start ordering some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
      
        <OrderItems
          date={itemData.item.getDateString}
          amount={itemData.item.getAmount}
          items={itemData.item.items}
          
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",

    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default OrderScreen;
