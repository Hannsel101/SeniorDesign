import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Actions } from 'react-native-router-flux';

const Login = () => {

  const goToSignup = () => {
    Actions.signup()
  }

  return (

    <View style={styles.container}>
      <Image style={{ width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginTop: 1 }}
        source={require('../assets/white_logo.png')}
      />

      <View style={styles.signupTextCont}>

        <TextInput style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor='#212121'
        />
        <TextInput style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Signin </Text>
        </TouchableOpacity>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> Create an Account </Text>
        </View>

        <TouchableOpacity onPress={goToSignup}>
          <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Signup Now!</Text>
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