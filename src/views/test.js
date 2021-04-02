import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert,Platform } from 'react-native';
import {request,PERMISSIONS} from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  
  render() {
    return (
      <View style={styles.container}>
 
        <Text>This is Location page! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    flex: 1,
    height: '100%',
  }
})