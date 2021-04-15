import React, { useState } from 'react'
import {
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
    SafeAreaView,
    StyleSheet,
    Button,
    Platform,
    RefreshControl
} from 'react-native'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



const Batteryinfo = () => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [UBP, setUBP] = useState({
        temperature: '',
        voltage: '',
        charge: ''
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //imagepath = "whats up"

        wait(2000).then(() => setRefreshing(false));
    });

    const images = {
        batteryimage: {
            green: require('../assets/greenb.png'),
            yellow: require('../assets/yellowb.png'),
            red: require('../assets/redb.png'),
            dead: require('../assets/deadcell.png')
        }

    };



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    ></RefreshControl>
                }
            >
                 <Button title="Click Here To Refresh" />

                <Image style={styles.batteryImage}
                    source={images.batteryimage.green}
                />
                <Image style={styles.batteryImage}
                    source={images.batteryimage.yellow}
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
                    <TextInput style={styles.statusText}> UBP: Unknown </TextInput>
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
            </ScrollView>
        </SafeAreaView>

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
    },
    scrollView: {
        flex: 1,
        color: 'black',

    }

});
export default Batteryinfo