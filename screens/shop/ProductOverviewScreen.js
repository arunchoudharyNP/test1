import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import Products from "../../components/Products";
import * as cartActions from "../../store/actions/Cart";
import * as productActions from "../../store/actions/Product";

const ProductOverviewScreen = props => {
  console.log('loadproducts');
  const products = useSelector(state => state.Products.availableProducts);

  const [isLoaded, setIsloaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    
    await dispatch(productActions.fetchProducts());
   
  }, [dispatch, setIsloaded]);

  const onSelectHandler = (id, title) => {
    props.navigation.navigate("productDetails", {
      productId: id,
      productTitle: title
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsloaded(true);
    loadProducts().then(()=>{
      setIsloaded(false);
    });
    
  }, [loadProducts]);

  if (isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={18} color="black" />
      </View>
    );
  }

  if (!isLoaded && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Product founds. Start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
    onRefresh ={loadProducts}
    refreshing ={ isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Products
          productsData={itemData}
          onSelect={() => {
            onSelectHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
          <Button
            title="Product Details"
            onPress={() => {
              onSelectHandler(itemData.item.id, itemData.item.title);
            }}
          />
        </Products>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
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
    ),

    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("cartItem");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default ProductOverviewScreen;
