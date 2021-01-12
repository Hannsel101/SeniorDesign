import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Login = () => {
    const goToAbout = () => {
        Actions.about()
    }
    return (
        <TouchableOpacity style={{ margin: 128 }} onPress={goToAbout}>
            <Text>Maya working on LOgin</Text>
        </TouchableOpacity>
    )
}
export default Login;