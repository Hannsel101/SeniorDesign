import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Actions } from 'react-native-router-flux'

const Signup = () => {



  return (
    <View style={styles.container}>
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
        <TextInput style={styles.inputBox}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Create Account </Text>
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
signupTextCont:{
  fontSize: 16,
  fontWeight: '500',
  color: '#ffffff',
  textAlign: 'center' 
},
signupText: {
  color: '#ffffff',
  fontSize:18,
  textAlign: 'center',
  marginVertical: 10,
},
signupbutton:{
  color:'#ffffff' , 
  fontSize: 18, 
  fontWeight:'500',
  textAlign: 'center',
  marginVertical: 10,
},


});

export default Signup;