import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
// google location not working perfectly because we are missing navigation.gelocation

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: "",
      predictions: []
    }
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );

  }
  async onChangeDestination(destination) {
    //Calls place autocomplete
    this.setState({ destination });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBOioG_vFXvfG6PeJ-ou4TSI9ytT6ImeG0&input=${destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      })
    } catch (err) {
      console.error(err);
    }

  }

  render() {
    const predictions = this.state.predictions.map(prediction => (
      <Text key={prediction.id}>{prediction.description}</Text>
    ));

    return (

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
        </MapView>

        <TextInput placeholder="Enter Destination Location"
          style={styles.destinationInput}
          value={this.state.destination}
          onChangeText={destination => this.onChangeDestination(destination)} />

        {predictions}

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
  },
  destinationInput: {
    height: 50,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    padding: 5,
  }
})

