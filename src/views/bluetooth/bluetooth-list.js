import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import Layout from './bluetooth-list-layout';
import Empty from './Empty.js';
import Toggle from './Toggle.js';
import Subtitle from './Subtitle.js';
import Device from './Device.js';
import BluetoothSerial from 'react-native-bluetooth-serial-next';


function BluetoothList(props)
{
    const [lista, setLista] = useState([]);
    const [bolEnable, setBolEnable] = useState(false);

    const renderEmpty = () => <Empty text='No Devices within range' />
    const renderItem = ({ item }) => {
        return <Device {...item} iconLeft={require('../../assets/sportsCar.png')} iconRight={require('../../assets/bluetoothSettings.png')} />
    };

    useEffect(() => {
        async function init() {
            const enable = await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            setLista(lista)
            setBolEnable(enable)
            console.log(lista)
        }

        init();

        return () => {
            async function remove() {
                await BluetoothSerial.stopScanning();
                console.log('Terminal Scanner');
            }

            remove();
        }
    }, [])


    const enableBluetooth = async () => {
        try {
            await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            await BluetoothSerial.stopScanning();
            setBolEnable(true);
            setLista(lista);
        } catch (error) {
            console.log(error);
        }
    };

    const disableBluetooth = async () => {
        try {
            await BluetoothSerial.disable();
            await BluetoothSerial.stopScanning();
            setBolEnable(false);
            setLista([]);
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

    return (
        <Layout title='Bluetooth Status'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth}/>
            <Subtitle title='Devices Found'/>
            <FlatList
                data={lista}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
            />
        </Layout>

        
        )
}
export default BluetoothList