/**
 * Imported libraries and APIs
 */
import * as React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';

/**
 * Imported custom classes and variables
 */
import App from './App';


// Configuration for firebase app to allow the use of the 
// backend api in the app
const firebaseConfig = {
    apiKey: "AIzaSyBGvr5UYrp0XgHhwjVe2xTrSAK6ahRGXsc",
    authDomain: "battery-swapping-network.firebaseapp.com",
    databaseURL: "https://battery-swapping-network.firebaseio.com",
    projectId: "battery-swapping-network",
    storageBucket: "battery-swapping-network.appspot.com",
    messagingSenderId: "850935668692",
    appId: "1:850935668692:web:f861580dc799728dbb4041"
  };

  // Check if the firebase app is already existing on this device
  // before attempting to initialize
if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

// Export firebase for use in the rest of the app
// Export Auth for firebase authentication functionality
export {
    firebase,
    Auth
};

// Setup calls the "App.js" file to start the main applicaiton after
// Setting up API's
function Setup(){
    return(<App />);
}
export default Setup;