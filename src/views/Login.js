/**
 * Imported libraries and APIs
 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Dimensions, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Actions } from 'react-native-router-flux';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import styled from "styled-components/native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

/**
 * Imported custom classes and variables
 */
import { Auth } from '../../Setup';
import { SignInUser } from '../../apiService';


const Login = () => {

  /**
   * State variable to extract user credentials from input
   * forms
   */
  const [credentials, setCredentials] = useState({
    emailAddress: '',
    password: '',
  });
  const [user, setUser] = useState();

  /** 
   * Action called when "Singup Now!" is pressed
   * Allows the application to navigate to the signup
   * page
   */
  const goToSignup = () => {
    Actions.signup()
  };

  /**
   * Action called after a user signs in successfully
   * Changes the users screen to the home screen
   * */
  const goToHome = () => {
    Actions.home()
  };

  /**
   * Action called when the user attempts to log in
   * using the "Signin" button
   */
  const authenticateUser = () => {
    // Check that the entry fields are not empty before authentication
    if (credentials.emailAddress && credentials.password) {
      SignInUser(credentials.emailAddress, credentials.password)
        .then((data) => {
          alert(data);
          goToHome();
        })
        .catch((error) => {
          alert(error);
        });
    }
    else {
      alert("Please fill out the entry fields");
    }
  };

  /**
   * Handles the user state when a users state changes from
   * either logged in or logged out
   * "useEffect" provides the callback to the firebase api
   * to call "onAuthStateChanged" function that is defined
   * here
   */
  const onAuthStateChanged = (user) => {
    setUser(user);
  }
  React.useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  return (

    <View style={styles.container}>
      <Video
        source={require("./../assets/video1.mp4")}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />
      <View style={styles.signupTextCont}>
        <Image style={{ width: 180, height: 180, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}
          source={require('../assets/white_logo.png')}
        />
        <TextInput style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor='#212121'
          value={credentials.emailAddress}
          onChangeText={(Text) => setCredentials({ ...credentials, emailAddress: Text })}
        />
        <TextInput style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
          value={credentials.password}
          onChangeText={(Text) => setCredentials({ ...credentials, password: Text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => authenticateUser()}>
          <Text style={styles.buttonText}> Signin </Text>
        </TouchableOpacity>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> Create an Account </Text>
        </View>

        <TouchableOpacity onPress={goToSignup}>
          <Text style={{ color: '#00e5ee', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Signup Now!</Text>
        </TouchableOpacity>

        <StatusBar
          backgroundColor="#005661"
          barStyle="light-content"
        />
        <StatusBar style="auto" />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#00838e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 200,
    height: 35,
    backgroundColor: '#ededed',
    borderRadius: 40,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#212121',
    marginVertical: 10

  },
  button: {
    backgroundColor: '#ededed',
    borderRadius: 60,
    width: 200,
    height: 35,
    marginVertical: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4

  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    textAlign: 'center'
  },
  signupTextCont: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  signupText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  signupbutton: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },


});

export default Login;