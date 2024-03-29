import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, TouchableHighlight, Keyboard, Image } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-gesture-handler';
import PolyLine from '@mapbox/polyline';

export default class App extends Component {
  // creating props to find the destinations
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: "",
      predictions: [],
      pointCoords: []
    }
  }

  /*Allows permission from the user to locate their  current location * */
  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  }

  // to get the destinations and predictions
  // getting current position for predictions
  componentDidMount() {
    this.requestLocationPermission();
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
  // getting routes 
  async getRouteDirections(placeId, destinationName) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=place_id:${placeId}&key=AIzaSyBOioG_vFXvfG6PeJ-ou4TSI9ytT6ImeG0`
      );
      const json = await response.json();
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({ pointCoords, destination: destinationName });
      // dismissing the keyboard after location is set
      Keyboard.dismiss();
      // zooming in the location after location is set
      this.map.fitToCoordinates(pointCoords);
      // passing latitude and longitude to zoom using pointCoords
    } catch (err) {
      console.error(err);
    }

  }


  async onChangeDestination(destination) {
    //Calls place autocomplete
    this.setState({ destination });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBOioG_vFXvfG6PeJ-ou4TSI9ytT6ImeG0&input=${destination}&location=${this.state.latitude},${this.state.longitude}&radius=50`;
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
    let marker = null;
    // when click prediction marker display on destination
    if (this.state.pointCoords.length > 1) {
      // if someone clicks pointcoords then
      //marker will be very last object of the pointCoords array
      marker = (
        <Marker coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }

    // highlights the predictions on press + ensure destination name stays in location box
    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight onPress={() => {
        this.getRouteDirections(prediction.place_id, prediction.structured_formatting.main_text);

      }}
        key={prediction.id}>
        <View>
          <Text style={styles.suggestions}>
            {prediction.structured_formatting.main_text}
          </Text>
        </View>
      </TouchableHighlight>
    ));
    /*Adding maps next* 
    Polyline shows the directions on maps*/
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this.map = map; }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          // intial co-ordinates for redwood city
          initialRegion={{
            latitude: 37.4848,
            longitude: -122.2281,
            latitudeDelta: 0.522,
            longitudeDelta: 0.6921,

          }}>
          <Marker
            coordinate={{ latitude: 37.5630, longitude: -122.3255 }}
          >
            <Image style={{ width: 20, height: 20 }} source={require('../assets/black_logo.png')} />
          </Marker>
          <Marker
            coordinate={{ latitude: 36.7378, longitude: -119.3255 }}
          >
            <Image style={{ width: 20, height: 20 }} source={require('../assets/black_logo.png')} />
          </Marker>

          <Polyline coordinates={this.state.pointCoords}
            StrokeWidth={7}
            StrokeColor="red"

          />
          {marker}
        </MapView>

        <TextInput placeholder="Enter Destination Location !"
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
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  map: {
    flex: 1,
    height: '100%',
  },
  destinationInput: {
    height: 40,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 20,
    padding: 2,
    backgroundColor: "white",
    borderWidth: 0.2
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
  },
})

/*Making changes to location maps*** */
