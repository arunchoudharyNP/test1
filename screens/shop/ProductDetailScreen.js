import React from "react";

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/Cart";


const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.Products.availableProducts.find(prod => prod.id === productId)
  );
  
  
  
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.imageContainer}
          source={{ uri: selectedProduct.imageUrl }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textBox}> ${selectedProduct.price} </Text>
          <Text style={styles.textBox}>{selectedProduct.description} </Text>
          
          <View>
            <Button
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    width: "100%"
  },
  textContainer: {
    alignItems: "center"
  },
  textBox: {
    fontSize: 16,
    padding: 5,
    marginHorizontal: 10
  }
});

export default ProductDetailScreen;
