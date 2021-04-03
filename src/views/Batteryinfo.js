import React from 'react'
import { TouchableOpacity, Text, TextInput, View, StatusBar, Image, StyleSheet } from 'react-native'


const Batteryinfo = () => {

    return (
        <View style={styles.container}>
            <Image style={styles.batteryImage}
                source={require('../assets/greenb.png')}
            />
            <Image style={styles.batteryImage}
                source={require('../assets/yellowb.png')}
            />
            <Image style={styles.batteryImage}
                source={require('../assets/redb.png')}
            />
            <Image style={styles.batteryImage}
                source={require('../assets/deadcell.png')}
            />
            <StatusBar
                backgroundColor="#005661"
                barStyle="light-content"
            />
            <StatusBar style="auto" />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.statusText}> UBP: none </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.statusText}> Charge: Unknown </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.statusText}> Temperature: Unknown  </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.statusText}> Health: Unknown </Text>
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
        width: 290,
        height: 80,
        left: 160,
        bottom: 320,
        backgroundColor: '#ededed',
        borderRadius: 40,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#212121',
        justifyContent: 'center',
        marginVertical: 10

    },
    statusText: {
        color: 'black',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 30

    },
    batteryImage: {
        width: 90,
        top: 90,
        left: 35,
        height: 110,
         }

});
export default Batteryinfo