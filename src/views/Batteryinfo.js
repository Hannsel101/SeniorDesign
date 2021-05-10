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
        tempchecker: [0, 0, 0],
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
        var newTemp = [...this.state.tempchecker];

        var newUpdates = global.statusUpdate;
        var splitVar = newUpdates.split(' ');
        newTemp[this.state.UBP_check] = splitVar[2];
        this.setState({tempchecker: newTemp})

        const newHealth = [...this.state.Health]

        if (splitVar[2] >= 32) {
            newHealth[this.state.UBP_check] = 'Poor'   // if temp >= 70 : Health = Poor
        }
        else if (splitVar[2] >= 29) {
            newHealth[this.state.UBP_check] = 'Average'  // if temp >= 30 : Health = Average
        }
        else {
            newHealth[this.state.UBP_check] = 'Optimal'     // otherwise Health: Good
        }
        this.setState({ Health: newHealth })


        this.updateVoltage(splitVar[0], splitVar[1]);
    }
    //----------------------------------------------------------------------------------------------------------------
    // Update the UBP's voltage paremeter
    updateVoltage = (totalVolt, voltUBP1) => {

        // Update the total voltage output by the system
        this.setState({totalVoltage: totalVolt});

        // Update the individual UBP voltages and images
        this.updateUBPVolt(voltUBP1, 0);
    }
    //----------------------------------------------------------------------------------------------------------------
    // Updates the battery image based on charge remaining of the individual UBPs
    updateUBPVolt = (UBP_volt, UBP_num) => {
        
        // Store the current state of each charge into a mutable variable
        var newVolt = [...this.state.Charge]
        
        // Update the battery image of the chosen battery to view
        const newImage = [...this.state.battImage];

        if (Number(UBP_volt) >= 3.50) {
            newImage[UBP_num] = images.batteryimage.green;
        }
        else if (Number(UBP_volt) >= 3.45) {
            newImage[UBP_num] = images.batteryimage.yellow;
        }
        else if (Number(UBP_volt) >= 3.20) {
            newImage[UBP_num] = images.batteryimage.red;
        }
        else {
            newImage[UBP_num] = images.batteryimage.dead;

            const newalert = [...this.state.check_alert];
            if (!newalert[UBP_num]) {
                // Update the alert array so that the message isnt displayed more than once
                newalert[UBP_num] = true;
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


        newVolt[UBP_num] = UBP_volt;
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
                        backgroundColor="#005661"
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
                        <Text style={styles.statusText}> Temperature: {this.state.tempchecker[this.state.UBP_check]}{'\u00b0'}C </Text>
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
