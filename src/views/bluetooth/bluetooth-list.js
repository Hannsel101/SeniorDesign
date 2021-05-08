import React, { useState, useEffect } from 'react';
import { View, 
    Text, 
    FlatList, 
    NativeEventEmitter, 
    PermissionsAndroid, 
    Platform, 
    NativeModules, 
    Alert } from 'react-native';

import Layout from './bluetooth-list-layout';
import Empty from './Empty.js';
import Toggle from './Toggle.js';
import Subtitle from './Subtitle.js';
import Device from './Device.js';
import BleManager from 'react-native-ble-manager';
import { Actions } from 'react-native-router-flux';

// Global BLE variables for use throughout the application
global.MAC = '';
global.serviceID = '';
global.statusChar = '5ae13f53-46ad-4fce-a27b-03ffe6ad9d75';
global.commandChar = '24a2a282-5fd5-4262-8490-a465ab0d9413';
global.statusUpdate = "";
global.readDone = false;

// BLE setup constants
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// Read data from the connected device
export const readBLE = () => {
    BleManager.read(global.MAC, global.serviceID, global.statusChar)
                .then((readData) => {
                    // Successfully read the battery status
                    global.statusUpdate = binary2String(readData);
                    console.log("Read: " + global.statusUpdate);
                    global.readDone = true;
                })
                .catch((error) => {
                    //We are failures
                    console.log(error);
                });
}

// Write data to the connected device
export const writeBLE = (command) => {
    BleManager.writeWithoutResponse(global.MAC, global.serviceID, global.commandChar,
                command).then(() => {
                    // Sucessfully sent a command
                    console.log("Wrote: a command");
                })
                .catch((error) => {
                    // We are failures
                    console.log(error);
                });
}
//==========================================================================================
//==========================================================================================
// Parse binary data passed through BLE into ASCII characters
function binary2String(input){
    return String.fromCharCode.apply(null, input);
}
//==========================================================================================
//==========================================================================================
function BluetoothList(props)
{
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);
    const [bolEnable, setBolEnable] = useState(false);

    /** Enable and disabling the BLE controller via GUI slider */
    const enableBluetooth = async () => {
        try {
            BleManager.enableBluetooth()
                .then(() => {
                    console.log("The bluetooth is already enabled or the user confirm");
                }).catch((error) =>{
                    console.log("The user refuse to enable bluetooth");
                });

            startScan();
            setBolEnable(true);
            setList(list);
        } catch (error) {
            console.log(error);
        }
    };

    const disableBluetooth = async () => {
        try {
            handleStopScan();
            setBolEnable(false);
            setList([]);
        } catch (error) {
            console.log(error);
        }
    };

    // handles the event when the user toggles the Bluetooth on and off slider switch
    const toggleBluetooth = value => {
        if (value) {
            return enableBluetooth();
        }
        disableBluetooth();
    }

    /**Function to handle scanning */
    const startScan = () => {
        if(!isScanning){
            BleManager.scan([], 2.5, true).then((results) => {
                console.log('Scanning...');
                setIsScanning(true);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    /**Function to stop scanning */
    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }

    /**Functions to handle the rendering of items and the case when no items are
     * present to render
     */
    const renderEmpty = () => <Empty text='No Devices within range' />
    const renderItem = ({ item }) => {
        return <Device {...item} onPress={ () => connectToPeripheral(item.id)}  iconLeft={require('../../assets/sportsCar.png')} iconRight={require('../../assets/bluetoothSettings.png')}/>
    };

    /** Connect to the peripheral selected from the list */
    const connectToPeripheral = (macAddress) => {
        BleManager.connect(macAddress)
        .then(() => {
            // Successfully connected
            global.MAC = macAddress;
            console.log("Connected to " + global.MAC)
            

            // Retrieve the services available
            BleManager.retrieveServices(macAddress)
            .then((peripheralInfo) => {
                // successfully retrieved services
                console.log("Service UUID: ", peripheralInfo.services[2])
                global.serviceID = peripheralInfo.services[2].uuid;           

                Actions.batteryinfo()

            });
        })
        .catch((error) => {
            // Failed to connect
            console.log("Unable to connect!")
        })
    }

    /** Disconnecting from a peripheral */
    const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if(peripheral){
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    /** Receiving data from a peripherals characteristic */
    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    /** Handle newly discovered peripheral */
    const handleDiscoverPeripheral = (peripheral) => {
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    /** Mount Listeners and unmount them????? */
    useEffect(() => {
        BleManager.start({ showAlert: false });

        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
        bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

        return (() => {
            console.log('unmount');
            bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
            //bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
            //bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
        })
    }, []);

    return (
        <Layout title='Bluetooth Status'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth}/>
            <Subtitle title='Devices Found'/>
            <FlatList
                data={list}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </Layout>
    )

}
export {BleManager}
export default BluetoothList