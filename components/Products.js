import React from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,

  TouchableNativeFeedback
} from "react-native";
import { max } from "moment";




const Products = props => {
  return (
    <View  useForeground>
      <TouchableNativeFeedback onPress={props.onSelect}  >
        <View style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: props.productsData.item.imageUrl }}
            />
          </View>
          
          <View style ={styles.textContainer}>
          <Text style={styles.titleBox}> {props.productsData.item.title}</Text>
          <Text style={styles.titleBox}> $ {props.productsData.item.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {props.children}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  },
  productContainer: {
    flex :1,
    elevation: 10,
    height: 300,
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 10
  },
  buttonContainer: {
    flexBasis :'30%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10
  },

  titleBox: {
    textAlign: "center",
    fontSize: 16
  },
  imageContainer: {
    flexBasis :'60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,  
    overflow: "hidden"
  },
  textContainer:{
    flexBasis:'10%'
  },
 
});

export default Products;
