/**
 * Imported libraries and APIs
 */
import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Actions } from 'react-native-router-flux'


/**
 * Imported custom classes and variables
 */
import { Auth } from '../../Setup';
import {SignUpUser} from '../../apiService';


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
   * Action called when the user attempts to create a new
   * account using the "Signup" button
   */
  const createNewAccount = () => {
    //check that entry fields are not empty
    if(credentials.emailAddress && credentials.password && credentials.confirmPass)
    {
      // Verify that both password inputs match
      if(credentials.password === credentials.confirmPass)
      {
        SignUpUser(credentials.emailAddress, credentials.password)
        .then((data) =>{
          alert(data);
        })
        .catch((error) =>{
          alert(error);
        });
      }
      else
      {
        alert("Error passwords do not match!");
      }
    }
    else
    {
      alert("Please fill out the entry fields");
    }  
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupTextCont}>
        <TextInput style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor='#212121'
          value={credentials.emailAddress}
          onChangeText={(Text)=>setCredentials({...credentials, emailAddress:Text})}
        />
        <TextInput style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
          value={credentials.password}
          onChangeText={(Text)=>setCredentials({...credentials, password:Text})}
        />
        <TextInput style={styles.inputBox}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor='#212121'
          value={credentials.confirmPass}
          onChangeText={(Text)=>setCredentials({...credentials, confirmPass:Text})}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress ={() => createNewAccount()}>
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