import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

const About = () => {
    const goToLogin = () => {
        Actions.Login()
    }
    return (
        <TouchableOpacity style={{ margin: 128 }} onPress={goToLogin}>
            <Text>This is ABOUT</Text>
        </TouchableOpacity>
    )
}
export default About