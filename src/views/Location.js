import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert,Platform } from 'react-native';
import {request,PERMISSIONS} from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  state = {
    coordinate: [
      { name: '1', latitude: 37.802525259, longitude: -122.4351431 },
      { name: '2', latitude: 37.7896386, longitude: -122.421646 },
      { name: '3', latitude: 37.77825, longitude: -122.4151431 },
      { name: '4', latitude: 37.78825, longitude: -122.4351431 }

    ]
  }
  componentDidMount(){
    this.requestLocationPermission();
  }
  showalertMessage = () => {
  Alert.alert (
    'Battery running low !!',
    'Please find a Battery Swapping Station ',
    [
      {
        text: 'Ignore',
        style:'Ignore'
      },
      {
        text: 'Remind later',
      }
    ]
  )
  }
  requestLocationPermission = async() => {
    if (Platform.OS === 'ios'){
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone:'+response);
      if (response === 'granted'){
        this.locateCurrentPosition
      }
    }
    else{
      var response = await request (PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android:'+response);
      if (response === 'granted'){
        this.locateCurrentPosition
      }
    }
  }
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
      }
    )

  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Circle
            center={{ latitude: 37.78825, longitude: -122.4324 }}
            radius={2000}
            fillColor ={'rgba(200,300,300,0.5)'}
          />
          <Marker
            draggable
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
            <Callout onPress={this.showalertMessage}>
              <Text> Marker placed here  </Text>
            </Callout >
          </Marker>
        </MapView>
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