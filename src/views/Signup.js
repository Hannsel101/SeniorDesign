/**
 * Imported libraries and APIs
 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Actions } from 'react-native-router-flux'
import styled from "styled-components/native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");



/**
 * Imported custom classes and variables
 */
import { Auth } from '../../Setup';
import { SignUpUser } from '../../apiService';


const Signup = () => {

  /**
   * State variable to extract user credentials from input
   * forms
   */
  const [credentials, setCredentials] = useState({
    emailAddress: '',
    password: '',
    confirmPass: '',
  });


  /**
   * Function to navigate back to the login page after
   * Successful account creation
   * */
  const goToLogin = () => {
    Actions.Login()
  }

  /**
   * Action called when the user attempts to create a new
   * account using the "Signup" button
   */
  const createNewAccount = () => {
    //check that entry fields are not empty
    if (credentials.emailAddress && credentials.password && credentials.confirmPass) {
      // Verify that both password inputs match
      if (credentials.password === credentials.confirmPass) {
        SignUpUser(credentials.emailAddress, credentials.password)
          .then((data) => {
            alert(data);
            goToLogin();
          })
          .catch((error) => {
            alert(error);
          });
      }
      else {
        alert("Error passwords do not match!");
      }
    }
    else {
      alert("Please fill out the entry fields");
    }
  };

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
        <TextInput style={styles.inputBox}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
          value={credentials.confirmPass}
          onChangeText={(Text) => setCredentials({ ...credentials, confirmPass: Text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => createNewAccount()}>
          <Text style={styles.buttonText}> Create Account </Text>
        </TouchableOpacity>

        <StatusBar
          backgroundColor="#000000"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 200,
    height: 35,
    backgroundColor: '#ededed',
    borderRadius: 50,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#212121',
    marginVertical: 10

  },
  button: {
    backgroundColor: '#ededed',
    borderRadius: 80,
    height: 35,
    width: 200,
    marginVertical: 12,
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

export default Signup;