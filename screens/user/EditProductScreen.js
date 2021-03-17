import React, { useCallback, useEffect, useReducer } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Product";
import FormInput from "../../components/FormInput";

const FORM_INPUT_UPDTAE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDTAE) {
    const updatedValues = {
      ...state.inputValue,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValidities: updatedValidities,
      inputValue: updatedValues,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

const editProductScreen = props => {
  const dispatch = useDispatch();

  const Id = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.Products.userProducts.find(prod => prod.id === Id)
  );

  const [formState, dispatchInput] = useReducer(formReducer, {
    inputValue: {
      title: editedProduct ? editedProduct.title : "",
      image: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      image: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");

  // const [titleIsValid, setTitleIsValid] = useState(false);

  // const [price, setPrice] = useState(editedProduct ? editedProduct.price : "");
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ""
  // );
  // const [image, setImage] = useState(
  //   editedProduct ? editedProduct.imageUrl : ""
  // );

  const submitHandler = useCallback(() => {
    console.log("Submit");

    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please enter a valid input", [
        { text: "Okay" }
      ]);
      return;
    }

    if (editedProduct) {
      dispatch(
        productActions.editProduct(
          Id,
          formState.inputValue.title,
          formState.inputValue.description,
          formState.inputValue.image
        )
      );
    } else {
      dispatch(
        productActions.addProduct(
          formState.inputValue.title,
          formState.inputValue.description,
          formState.inputValue.image,
          +formState.inputValue.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, Id, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchInput({
        type: FORM_INPUT_UPDTAE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchInput]
  );

  return (
    <KeyboardAvoidingView style={{flex:1}}  behavior='padding' keyboardVerticalOffset={100} >
      <ScrollView>
        <View style={styles.container}>
          <FormInput
            id="title"
            label="title"
            errorText="Please enter a valid titile!"
            keyboardType="default"
            returnKeyType="next"
            onInputChanges={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />

          {editedProduct ? null : (
            <FormInput
              id="price"
              label="price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChanges={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <FormInput
            id="description"
            label="description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            multiline
            numberOfLines={1}
            onInputChanges={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <FormInput
            id="image"
            label="image URL"
            errorText="Please enter a valid Image URL!"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChanges={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20
  }
});

editProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="menu" iconName="md-checkmark" onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

export default editProductScreen;
