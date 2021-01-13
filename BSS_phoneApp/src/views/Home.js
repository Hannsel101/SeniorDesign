import React from 'react'
import { StyleSheet, TouchableOpacity, Text, StatusBar, View, TextInput, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Home = () => {
    const goToProfile = () => {
        Actions.profile()
      }
    const goToAbout = () => {
        Actions.about()
      }
    return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor="#005661"
          barStyle="light-content"
        />
        <StatusBar style="auto" />
  
        <TouchableOpacity style={styles.button} onPress={goToProfile}>
            <Text style={styles.buttonText}> View Profile </Text>
         </TouchableOpacity>  
         <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}> Navigate Location </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}> History </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}> Switch Batteries </Text>
         </TouchableOpacity>
         <TouchableOpacity style={{ margin: 128 }} onPress={goToAbout}>
          <Text style={{ color: '#ffffff' }}>About this App! </Text>
         </TouchableOpacity>
  
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
export default Home;