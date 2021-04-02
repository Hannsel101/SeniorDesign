import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

const About = () => {
    
    const goToLogin = () => {
        Actions.Login()
    }
    const goToBatteryinfo = () => {
        Actions.batteryinfo()
    }
    return (
        <View>
        <TouchableOpacity style={{ margin: 128 }} onPress={goToLogin}>
            <Text>Click on Login  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 128 }} onPress={goToBatteryinfo}>
            <Text>Click on batteryinfo  </Text>
        </TouchableOpacity>

        <Text>Welcome to Battery Swapping App.  </Text>
        </View>
        
    )
}
export default About