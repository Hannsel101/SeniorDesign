import React from 'react'
import { StyleSheet, TouchableOpacity, Text, StatusBar, View, TextInput, Image, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styled from "styled-components/native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");
const Home = () => {
    const goToLocation = () => {
        Actions.location()
    }
    const goToProfile = () => {
        Actions.profile()
    }
    const goToHistory = () => {
        Actions.history()
    }
    const goToLogin = () => {
        Actions.Login()
    }
    const goToBattery = () => {
        Actions.battery()
    }
    const goToAbout = () => {
        Actions.about()
    }

    return (
        <View style={styles.container}>
            <Video
          source={require("./../assets/video4.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
            <StatusBar
                backgroundColor="#000000"
                barStyle="light-content"
            />
            <StatusBar style="auto" />

            <Image style={{ width: 180, height: 180, justifyContent: 'center',alignItems: 'center',marginTop: 140 }}
            source ={require('../assets/white_logo.png')}
             />
             
            <TouchableOpacity style={styles.button} onPress={goToLogin}>
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={goToProfile}>
                <Text style={styles.buttonText}> View Profile </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToHistory}>
                <Text style={styles.buttonText}> History </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToLocation}>
                <Text style={styles.buttonText}> Navigate Location </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToBattery}>
                <Text style={styles.buttonText}> Switch Batteries </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 80 }} onPress={goToAbout}>
                <Text style={{ color: '#ffffff' }}>About this App! </Text>
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
    inputBox: {
        width: 200,
        height: 30,
        backgroundColor: '#ededed',
        borderRadius: 40,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#212121',
        marginVertical: 10

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
export default Home