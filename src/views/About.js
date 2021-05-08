import React from 'react'
import { TouchableOpacity, Text, View, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

const About = () => {


    return (
        <View>
            <StatusBar
                backgroundColor="#000000"
                barStyle="light-content"                // status bar
            />
            <StatusBar style="auto" />

            <Text>Welcome to Battery Swapping App.   </Text>
        </View>

    )
}
export default About