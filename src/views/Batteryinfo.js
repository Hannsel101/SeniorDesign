import { Component } from "react";
import React from 'react'
import { TouchableOpacity, Text, View, StatusBar, Image, StyleSheet, TouchableHighlight, Button } from 'react-native'

const images = {
    batteryimage: {
        green: require('../assets/greenb.png'), // >= 75
        yellow: require('../assets/yellowb.png'), // >= 50
        red: require('../assets/redb.png'), // > = 25
        dead: require('../assets/deadcell.png')
    }

};


export default class just extends Component {
// intial states
    state = {
        Charge: 10,
        Health: 'Good',
        img: images.batteryimage.green,
        NumbHolder: 1,
        UBP_check:'Click battery',
        tempchecker:0,
    }
    constructor() {
        super()

    }
    battery1 = () =>{
        this.setState({UBP_check: 1})
    }
    battery2 = () =>{
        this.setState({UBP_check: 2})
    }
    battery3 = () =>{
        this.setState({UBP_check: 3})
    }

    // generates random number between 1-100
    RandomNumGenerator = () => {
        var RandNumb = Math.floor(Math.random() * 100) + 1; // status of charge
        this.setState({ NumbHolder: RandNumb })      
        if (RandNumb >= 66 ) {
            this.setState({ img: images.batteryimage.green })   
        }
        else if (RandNumb >= 33) {
            this.setState({ img: images.batteryimage.yellow })   
        }
        else {
            this.setState({ img: images.batteryimage.dead })
        }
        this.TemperatureSetter()
    }

    // Based on Temperature -> Health gets changed
    TemperatureSetter = () => {
        var temp =  Math.floor(Math.random() * 100) + 1;    // temperature
        this.setState({tempchecker: temp})
        if (temp >= 70){
            this.setState({ Health: 'Poor' })    // if temp >= 70 : Health = Poor
        }
        else if (temp >= 30){
            this.setState({ Health: 'Average' })  // if temp >= 30 : Health = Average
        }
        else{
            this.setState({ Health: 'Good' })     // otherwise Health: Good
        }        
    }

// 

    render() {

        return (

            <View style={styles.container}>

                <Button
                    title="Update Status"
                    onPress={this.RandomNumGenerator}  // update button
                />
                 <TouchableOpacity onPress={this.battery1} >
                    <Image style={styles.batteryImage}      // changeable image
                    source={this.state.img}/> 
                 </TouchableOpacity>
                
                <TouchableOpacity onPress={this.battery2}>
                    <Image style={styles.batteryImage}      // second battery img
                    source={require('../assets/redb.png')} />                     
                </TouchableOpacity>

                <TouchableOpacity onPress={this.battery3} >
                    <Image style={styles.batteryImage}      // third battery img
                    source={require('../assets/deadcell.png')} />
                </TouchableOpacity>

                <StatusBar
                    backgroundColor="#005661"
                    barStyle="light-content"                // status bar
                />
                <StatusBar style="auto" />
                
                    
                <TouchableHighlight style={styles.button}>   
                    <Text style={styles.statusText}> UBP: {this.state.UBP_check} </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Charge: {this.state.NumbHolder} % </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Temperature: {this.state.tempchecker}{'\u00b0'}C </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}>
                    <Text style={styles.statusText}> Health: {this.state.Health}  </Text>
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
/** */
/**
 *                 <Button
                    title="Update state"
                    onPress={this.updateUsername} />
                <Text>{this.state.username}</Text>
 *
 *
 *                  updateUsername = () => {
        if (this.state.updateuser) {
            this.setState({ username: 'Hannsel' })
            this.setState({ updateuser: false })
            this.setState({ blah: images.batteryimage.yellow })
        }
        else if (!this.state.updateuser) {
            this.setState({ username: 'KIP' })
            this.setState({ updateuser: true })
            this.setState({ blah: images.batteryimage.red })
        }
    }

 * <button onClick={this.updateUsername}>Refresh name</button>
                <> Username: {this.state.username}</>
 */
