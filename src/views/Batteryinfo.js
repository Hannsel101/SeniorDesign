import React from 'react'
import { TouchableOpacity, Text, TextInput, View, StatusBar, Image, StyleSheet } from 'react-native'


const Batteryinfo = () => {


    return (
        <View style={styles.container}>
            <Image style={{ width: 90, height: 110 }}
                source={require('../assets/greenb.png')}
            />
            <Image style={{ width: 90, height: 110 }}
                source={require('../assets/yellowb.png')}
            />
            <Image style={{ width: 90, height: 110 }}
                source={require('../assets/redb.png')}
            />
            <Image style={{ width: 90, height: 110 }}
                source={require('../assets/deadcell.png')}
            />
            <StatusBar
                backgroundColor="#005661"
                barStyle="light-content"
            />
            <StatusBar style="auto" />

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}> UBP: none </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}> Charge: Unknown </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}> Temperature: Unknown  </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}> Health: Unknown </Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00838e',

    },

    button: {
        width: 150,
        height: 80,
        left: 134,
        bottom: 320,
        backgroundColor: '#ededed',
        borderRadius: 40,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#212121',
        justifyContent: 'center',
        marginVertical: 10

    },

});
export default Batteryinfo