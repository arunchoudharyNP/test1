import React from 'react';

import { View, Text, StyleSheet, Image } from "react-native"
import { max } from 'moment';

const OrderList = props => {

    return (
        <View style={styles.productContainer} >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.imageUrl }} />
                <Text style={styles.title}> {props.title}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.titleBox}>
                    {" "}
                    Quantity : {props.quantity}
                </Text>
                <Text style={styles.titleBox}>
                    {" "}
                    Price : $ {props.price}
                </Text>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    imageContainer: {
        flexBasis: "30%",
        alignContent:"flex-start"


    },
    image: {
        borderRadius: 10,
        width: "100%",
        height: "70%",
        borderWidth: 0.5,
        borderColor: "grey",
        
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600"
    },
    titleBox: {
        fontSize: 16,
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 20
    },
    textContainer: {
        flexBasis: "40%"
    },
    productContainer: {
        flexDirection: "row",
        
       width:"100%",
        justifyContent: "flex-start",
        height: 120,
        marginVertical:5

        



    }

})

export default OrderList;
