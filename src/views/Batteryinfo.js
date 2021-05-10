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
    Dimensions,
    ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { readBLE, writeBLE } from './bluetooth/bluetooth-list';


const { width, height } = Dimensions.get("window");
const img = require('../assets/start.png');

// Images for battery cells used to indicate percentage of charge
const images = {
    batteryimage: {
        green: require('../assets/greenbatt.png'),
        yellow: require('../assets/yellowbatt.png'),
        red: require('../assets/redbatt.png'),
        dead: require('../assets/deadbatt.png')
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
        tempchecker: 0,
        check_alert: [false, false, false],
        UBPsActive: '0',
        totalVoltage: 0,
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

        var newActive = '';
        if(newSelected[0]){
            newActive += '1';
            if(newSelected[1])
                newActive += ', 2';
            if(newSelected[2])
                newActive += ', 3';
        }else if(newSelected[1]){
            newActive += '2';
            if(newSelected[2])
                newActive += ', 3';
        }else if(newSelected[2]){
            newActive += '3';
        }else{
            newActive += 'No UBPs Active';
        }

        this.setState({UBPsActive: newActive});
        this.setState({ UBP_Selected: newSelected });
        writeBLE([newCommand]);
    }
    //----------------------------------------------------------------------------------------------------------------
    // Function for reading in UBP status updates through BLE from the embedded system
    readStatusUpdate = () => {
        readBLE();
        this.updateTemperature();
    }
    //================================================================================================================
    // Update the UBP's tempature parameter
    updateTemperature = () => {

        var newUpdates = global.statusUpdate;
        var splitVar = newUpdates.split(' ');
        var newTemp = splitVar[4];
        this.setState({tempchecker: newTemp})

        const newHealth = [...this.state.Health]

        if (splitVar[4] >= 32) {
            newHealth[0] = 'Poor'   // if temp >= 70 : Health = Poor
        }
        else if (splitVar[4] >= 29) {
            newHealth[0] = 'Average'  // if temp >= 30 : Health = Average
        }
        else {
            newHealth[0] = 'Optimal'     // otherwise Health: Good
        }

        newHealth[1] = newHealth[0];
        newHealth[2] = newHealth[1];
        this.setState({ Health: newHealth })


        this.updateVoltage(splitVar[0], splitVar[1], splitVar[2], splitVar[3]);
    }
    //----------------------------------------------------------------------------------------------------------------
    // Update the UBP's voltage paremeter
    updateVoltage = (totalVolt, voltUBP1, voltUBP2, voltUBP3) => {

        // Update the total voltage output by the system
        this.setState({totalVoltage: totalVolt});

        // Update the individual UBP voltages and images
        this.updateUBPVolt(voltUBP1, voltUBP2, voltUBP3);
        
    }
    //----------------------------------------------------------------------------------------------------------------
    // Updates the battery image based on charge remaining of the individual UBPs
    updateUBPVolt = (UBP_volt1, UBP_volt2, UBP_volt3) => {
        
        // Store the current state of each charge into a mutable variable
        var newVolt = [...this.state.Charge]
        
        // Update the battery image of the chosen battery to view
        const newImage = [...this.state.battImage];

        if (Number(UBP_volt1) >= 3.50) {
            newImage[0] = images.batteryimage.green;
        }
        else if (Number(UBP_volt1) >= 3.00) {
            newImage[0] = images.batteryimage.yellow;
        }
        else if (Number(UBP_volt1) >= 2.78) {
            newImage[0] = images.batteryimage.red;
        }
        else {
            newImage[0] = images.batteryimage.dead;

            const newalert = [...this.state.check_alert];
            if (!newalert[0]) {
                // Update the alert array so that the message isnt displayed more than once
                newalert[0] = true;
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


        // Update ubp2 image
        if (Number(UBP_volt2) >= 3.50) {
            newImage[1] = images.batteryimage.green;
        }
        else if (Number(UBP_volt2) >= 3.00) {
            newImage[1] = images.batteryimage.yellow;
        }
        else if (Number(UBP_volt2) >= 2.5) {
            newImage[1] = images.batteryimage.red;
        }
        else {
            newImage[1] = images.batteryimage.dead;

            const newalert = [...this.state.check_alert];
            if (!newalert[1]) {
                // Update the alert array so that the message isnt displayed more than once
                newalert[1] = true;
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

        // update UBP3 image
        if (Number(UBP_volt3) >= 3.50) {
            newImage[2] = images.batteryimage.green;
        }
        else if (Number(UBP_volt3) >= 3.00) {
            newImage[2] = images.batteryimage.yellow;
        }
        else if (Number(UBP_volt3) >= 2.78) {
            newImage[2] = images.batteryimage.red;
        }
        else {
            newImage[2] = images.batteryimage.dead;

            const newalert = [...this.state.check_alert];
            if (!newalert[2]) {
                // Update the alert array so that the message isnt displayed more than once
                newalert[2] = true;
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


        newVolt[0] = UBP_volt1;
        newVolt[1] = UBP_volt2;
        newVolt[2] = UBP_volt3;
        this.setState({Charge: newVolt});
    }
//================================================================================================================
//================================================================================================================
    // Code that handles the actual rendering of objects created above.
    render() {

        return (

            <View style={styles.container}>
                <ImageBackground source={img} style={styles.image}>

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
                        backgroundColor="#000000"
                        barStyle="light-content"                // status bar
                    />
                    <StatusBar style="auto" />


                    <TouchableHighlight style={styles.button}>
                        <Text style={styles.statusText}> UBP: {this.state.UBPsActive}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button}>
                        <Text style={styles.statusText}> Total Voltage: {this.state.totalVoltage} V </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button}>
                        <Text style={styles.statusText}> Temperature: {this.state.tempchecker}{'\u00b0'}C </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button}>
                        <Text style={styles.statusText}> Health: {this.state.Health[this.state.UBP_check]}  </Text>
                    </TouchableHighlight>


                </ImageBackground>


            </View>
        );

    }


}
const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
    },

    container: {
        flex: 1,
    },

    button: {
        width: 290,
        height: 120,
        left: 160,
        bottom: 530,
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
        top: 30,
        left: 35,
        height: 180,
    },
    scrollView: {
        flex: 1,
        color: 'black',
    }

});
