import React from 'react'
import { StyleSheet,TouchableOpacity, Text, View,StatusBar,Image, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styled from "styled-components/native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const Battery = () => {

    const goToLocation = () => {
        Actions.location()
      }
      const goToSearchBar = () => {
        Actions.searchbar()
      }
      const goToBatteryinfo = () => {
        Actions.batteryinfo()
    }      
    return (
        <View style={styles.container}>
           <Video
          source={require("./../assets/video5.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
         <StatusBar
             backgroundColor="#005661"
            barStyle="light-content"
        />
        <Image style={{ width: 150, height: 150, justifyContent: 'center',alignItems: 'center' }}
           source ={require('../assets/batterhistory.png')}
        />

         <TouchableOpacity style={styles.button}>
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}> Switch Battery! </Text>
        </TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={goToLocation}>
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}> Look for BSS near me! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToBatteryinfo}>
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}> Battery Infomation </Text>
        </TouchableOpacity>

        </View>
        
    )
}
const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
    container: {
      flex: 1,
      backgroundColor: '#00838e',
      alignItems: 'center',
      justifyContent: 'center',
    },

    button: {
      backgroundColor: '#ededed',
      borderRadius: 60,
      width: 200,
      marginVertical: 10,
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
    
  
  });
export default Battery