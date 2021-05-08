import { Component } from "react";
import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    StatusBar,
    Image,
    StyleSheet,
    TouchableHighlight,
    Button,
    Alert,
    
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { readBLE, writeBLE } from './bluetooth/bluetooth-list';
import styled from "styled-components/native";
import Video from "react-native-video";





// Images for battery cells used to indicate percentage of charge
const images = {
    batteryimage: {
        green: require('../assets/greenb.png'),
        yellow: require('../assets/yellowb.png'),
        red: require('../assets/redb.png'),
        dead: require('../assets/deadcell.png')
    }

};

export default class just extends Component {
    // intial states
    state = {
        Charge: [0, 0, 0],
        Health: ['Not Available', 'Not Available', 'Not Available'],
        battImage: [images.batteryimage.dead, images.batteryimage.dead, images.batteryimage.dead],
        UBP_check: 0,
        UBP_Selected: [false, false, false],
        UBP_Command: 48,
        tempchecker: [0, 0, 0],
        check_alert: [false, false, false],

    }
    constructor() {
        super()
    }
    //================================================================================================================
    // Function that allows sending UBP commands from the phone to be communicated to the embedded system through BLE.
    batteryGUI = (battNum) => {
        var newSelected = [...this.state.UBP_Selected];
        var newCommand = this.state.UBP_Command;
        this.setState({ UBP_check: battNum });

        newSelected[battNum] = !newSelected[battNum];
        if (newSelected[battNum]) {
            newCommand += Math.pow(2, battNum);
            this.setState({ UBP_Command: newCommand });
        } else {
            newCommand -= Math.pow(2, battNum);
            this.setState({ UBP_Command: newCommand });
        }
        this.setState({ UBP_Selected: newSelected });
        writeBLE([newCommand]);
    }
    //----------------------------------------------------------------------------------------------------------------
    // Function for reading in UBP status updates through BLE from the embedded system
    readStatusUpdate = () => {
        readBLE();
    }
    //================================================================================================================
    // Update the UBP's tempature parameter
    updateTemperature = () => {

    }
    //----------------------------------------------------------------------------------------------------------------
    // Update the UBP's voltage paremeter
    updateVoltage = () => {

    }
    //================================================================================================================
    // generates random number between 1-100
    RandomNumGenerator = () => {
        var RandNumb = Math.floor(Math.random() * 100) + 1; // status of charge




        // Update the charge of the chosen battery to view
        const newCharge = [...this.state.Charge];
        newCharge[this.state.UBP_check] = RandNumb;
        this.setState({ Charge: newCharge })

        // Update the battery image of the chosen battery to view
        const newImage = [...this.state.battImage];

        if (RandNumb >= 75) {
            newImage[this.state.UBP_check] = images.batteryimage.green;
        }
        else if (RandNumb >= 25) {
            newImage[this.state.UBP_check] = images.batteryimage.yellow;
        }
        else if (RandNumb >= 5) {
            newImage[this.state.UBP_check] = images.batteryimage.red;
        }
        else {
            newImage[this.state.UBP_check] = images.batteryimage.dead;

            const newalert = [...this.state.check_alert];
            if (!newalert[this.state.UBP_check]) {
                // Update the alert array so that the message isnt displayed more than once
                newalert[this.state.UBP_check] = true;
                this.setState({ check_alert: newalert })

                // Display an alert to the user with the option to go directly to the navigation
                // page or to stay on the current page
                Alert.alert(
                    'Warning',
                    'Please stop by a battery swapping station immediately',
                    [
                        {
                            text: 'Find Swapping Station',
                            onPress: () => { Actions.location() }
                        },
                        {
                            text: 'OK',
                        }
                    ]
                )
            }
        }
        this.setState({ battImage: newImage })

        // Update the temperature of the chosen battery to view
        this.TemperatureSetter()
    }

    // Based on Temperature -> Health gets changed
    TemperatureSetter = () => {
        var temp = Math.floor(Math.random() * 100) + 1;    // temperature

        const newHealth = [...this.state.Health]
        const newTemp = [...this.state.tempchecker]

        newTemp[this.state.UBP_check] = temp;

        if (temp >= 70) {
            newHealth[this.state.UBP_check] = 'Poor'   // if temp >= 70 : Health = Poor
        }
        else if (temp >= 30) {
            newHealth[this.state.UBP_check] = 'Average'  // if temp >= 30 : Health = Average
        }
        else {
            newHealth[this.state.UBP_check] = 'Good'     // otherwise Health: Good
        }
        this.setState({ tempchecker: newTemp })
        this.setState({ Health: newHealth })
    }

    // Code that handles the actual rendering of objects created above.
    render() {

        return (

            <View style={styles.container}>


                <Button
                    title="Update Status"
                    onPress={this.readStatusUpdate}  // update button
                />
                <TouchableOpacity onPress={() => this.batteryGUI(0)} >
                    <Image style={styles.batteryImage}      // changeable image
                        source={this.state.battImage[0]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.batteryGUI(1)}>
                    <Image style={styles.batteryImage}      // second battery img
                        source={this.state.battImage[1]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.batteryGUI(2)} >
                    <Image style={styles.batteryImage}      // third battery img
                        source={this.state.battImage[2]} />
                </TouchableOpacity>

                <StatusBar
                    backgroundColor="#005661"
                    barStyle="light-content"                // status bar
                />
                <StatusBar style="auto" />


                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> UBP: {this.state.UBP_check + 1} </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Voltage: {this.state.Charge[this.state.UBP_check]} V </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Temperature: {this.state.tempchecker[this.state.UBP_check]}{'\u00b0'}C </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Health: {this.state.Health[this.state.UBP_check]}  </Text>
                </TouchableHighlight>





            </View>
        );

    }


}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#00838e',

    },

    button: {
        width: 290,
        height: 120,
        left: 160,
        bottom: 520,
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
        fontSize: 17,
        fontWeight: 'bold',
        padding: 30

    },
    batteryImage: {
        width: 90,
        top: 40,
        left: 35,
        height: 180,
    },
    scrollView: {
        flex: 1,
        color: 'black',

    }

});
