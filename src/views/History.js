import React from 'react'
import { StyleSheet,TouchableOpacity, Text, View,StatusBar,Image } from 'react-native'
//import { Actions } from 'react-native-router-flux'

const History = () => {

    return (
        <View style={styles.container}>
         <StatusBar
             backgroundColor="#005661"
            barStyle="light-content"
        />
        <Image style={{ width: 150, height: 150, justifyContent: 'center',alignItems: 'center' }}
          source ={require('../assets/batterhistory.png')}
        />
        <TouchableOpacity >
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold',}}>  Battery History </Text>
        </TouchableOpacity>
        
        <Image style={{ width: 150,height: 150, justifyContent: 'center',alignItems: 'center' }}
           source ={require('../assets/moneyhistory.png')}
        />

        <TouchableOpacity >
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}>  Payment History </Text>
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

export default History