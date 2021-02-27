import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, Platform , TouchableOpacity} from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends Component {
  // creating props to find the destinations
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

 // created location permission setup
  componentDidMount() {
    this.requestLocationPermission();
  }
  showalertMessage = () => {
    Alert.alert(
      'Battery running low !!',
      'Please find a Battery Swapping Station ',
      [
        {
          text: 'Ignore',
          style: 'Ignore'
        },
        {
          text: 'Remind later',
        },
        {
          text: 'omg',
        }
      ]
    )
  } /*Allows permission from the user to locate
    * there  current location * */
  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone:' + response);
      if (response === 'granted') {
        this.locateCurrentPosition
      }
    }
    else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android:' + response);
      if (response === 'granted') {
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
  // to get the destinations and predictions
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
 /*Adding maps next* */
    return (
      <View style={styles.container}>
        
        
        <MapView
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
    marginRight:5,
    marginBottom:10,
    marginVertical:10,
    marginLeft: 5,
    fontSize: 20,
    padding: 2,
    backgroundColor:"white",
    borderWidth:0.2
  },
})

/*Making changes to location maps*** */