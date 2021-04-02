import { StatusBar } from 'expo-status-bar'
import React, { useState, Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { StyleSheet, Platform, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, AppRegistry } from 'react-native'
import Routes from './src/components/Routes.js'


class App extends Component {
    render() {
        return (
            
            <Routes />
            
        )
    }
}
export default App
