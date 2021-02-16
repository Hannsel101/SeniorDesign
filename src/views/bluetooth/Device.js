import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

import Separator from './Separator.js'

function Device(props) {
    return (
        <>
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.wrapperLeft}>
                <Image style={styles.iconLeft} source={props.iconLeft}/>
            </View>
            <View style={styles.wrapperName}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
                <Image style={styles.iconRight} source={props.iconRight}/>
        </TouchableOpacity>
        <Separator/>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    wrapperLeft: {
        width: 50,
        height: 50,
        borderRadius: 40,
        borderColor: 'gray',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    wrapperName: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        color: 'black'
    },
    iconLeft: {
        width: 40,
        height:20
    },
    iconRight: {
        width: 40,
        height:40
    },
})
export default Device