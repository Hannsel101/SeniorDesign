import React from 'react'
import { TouchableOpacity, Text,StyleSheet, View,StatusBar,SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'

const SearchBar = () => {

    return (
        <SafeAreaView>
        <View>
        <TextInput style={styles.locationbox} placeholder = 'Current Location ...'/>
         <TextInput style={styles.locationbox} placeholder = 'Destination Location ...'/>
        </View>
        </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
    container: {
      marginTop:StatusBar.currentHeight,
      paddingHorizontal:16, 
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      height:50,
      borderRadius:8
    },
    SearchInput:{
        width:'100%',
        height:'100%',
        paddingLeft:8,
        fontSize:16,

    },
    locationbox:{
        padding:10,
        height:50,
        backgroundColor:'#eeee',
        marginVertical:5,

    }
    
  
  });
export default SearchBar