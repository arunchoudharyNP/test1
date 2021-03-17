import React from "react";

import { Alert, Button, FlatList ,Text,View,StyleSheet} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import Products from "../../components/Products";
import * as productsActions from "../../store/actions/Product";

const UserProductScreen = props => {
  const dispatch = useDispatch();

  const editProductHandler = itemData => {
    props.navigation.navigate("editProduct", {
      productId: itemData.item.id,
      productTitle: itemData.item.title
    });
  };

  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you really want to delete product?", [
      {
        text: "No",
        style: "default"
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  const userProducts = useSelector(state => state.Products.userProducts);

  if (userProducts.length ===0) {
    return (
      <View style={styles.centered}>
        <Text>No Product founds. Start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={Item => Item.id}
      renderItem={itemData => (
        <Products
          productsData={itemData}
          onSelect={() => {
            editProductHandler(itemData);
          }}
        >
          <Button
            title="Edit "
            onPress={() => {
              editProductHandler(itemData);
            }}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </Products>
      )}
    />
  );
};

UserProductScreen.navigationOptions = navData => {
  return {
    headerTitle: "User Products",
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
          title="add"
          iconName="md-create"
          onPress={() => {
            navData.navigation.navigate("editProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});
export default UserProductScreen;
