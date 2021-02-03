import React from 'react'
import { TouchableOpacity, Text, View,StatusBar,Image } from 'react-native'
//import { Actions } from 'react-native-router-flux'

const Profile = () => {

    return (
        <View>
         <StatusBar
             backgroundColor="#005661"
            barStyle="light-content"
        />
        <TouchableOpacity >
        <Text style={{ color: 'black', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}>  Profile Page Under Construction </Text>
        </TouchableOpacity>

        <Image style={{ width: 375, height: 150, marginTop: 130, justifyContent: 'center',alignItems: 'center' }}
          source ={require('../assets/Page_Under_Construction.png')}
        />
        </View>
        
    )
}
export default Profile