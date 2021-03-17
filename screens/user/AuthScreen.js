import React, { useState,useEffect ,useCallback, useReducer } from "react";

import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";

import { useDispatch } from "react-redux";

import FormInput from "../../components/FormInput";
import Card from "../../components/UI/Card";
import * as authActions from "../../store/actions/auth";

import { LinearGradient } from "expo-linear-gradient";

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

const AuthScreen = props => {
  const dispatch = useDispatch();
  
  const [error,setError] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [formState, dispatchInput] = useReducer(formReducer, {
    inputValue: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });
  
  useEffect(() => {
    if(error){
    Alert.alert('An ERROR Occoured', error, [{text :'Okay'}]);
    }
  }, [error]);

  const signupHandler = useCallback(
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

  const authHandler = async () => {
    let action;
    if (isLogin) {
      action = authActions.login(
        formState.inputValue.email,
        formState.inputValue.password
      );

     
    } else {
      action = authActions.signup(
        formState.inputValue.email,
        formState.inputValue.password
      );
    }
    setIsloading(true);
    setError(null);
  try {

    await dispatch(action);
    props.navigation.navigate('Main');

  } catch (err) {
     setError(err.message);
     setIsloading(false);
  } 
   
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#fff", "#708090"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <FormInput
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid Email"
              onInputChanges={signupHandler}
              initialValue=""
              initiallyValid={false}
            />
            <FormInput
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChanges={signupHandler}
              initialValue=""
              initiallyValid={false}
            />
            <View style={styles.buttonContainer}>
              { isLoading ? <ActivityIndicator size='small' color='black' />   :
                <Button
                  title={isLogin ? "Login" : "Sign up"}
                  color="#FFA500"
                  onPress={authHandler}
                />
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isLogin ? "Sign up" : "Login"}`}
                color="#FF4500"
                onPress={() => {
                  setIsLogin(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "x"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },

  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
