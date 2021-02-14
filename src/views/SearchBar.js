import React from 'react'
import { useState, } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, StatusBar, SafeAreaView, } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Value } from 'react-native-reanimated';
import { useEffect } from 'react';

const SearchBar = () => {
    /*Store state variable and use later to find routes ** */


    const [originPlace, setOriginPlace] = useState('null');
    const [DestinationPlace, setDestinationPlace] = useState('null');
    /*check if both locations are added * */
    useEffect (() =>{
        console.warn('useEffect is called')
        if (originPlace&& DestinationPlace){
            console.warn ('Redirect to result');
        }

    });
    return (
        /*Adding Autofill location here using Google auto** */
        <SafeAreaView>
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='Current Location'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setOriginPlace( { data, details });
                        console.log(data, details);
                    }}
                    fetchDetails
                    query={{
                        key: 'AIzaSyBOioG_vFXvfG6PeJ-ou4TSI9ytT6ImeG0',
                        language: 'en',
                    }}
                />


                <GooglePlacesAutocomplete
                    placeholder='Destination Location'
                    onPress={(data, details = null) => {
                        setDestinationPlace( { data, details });
                        console.log(data, details);
                    }}
                    styles={{
                        textInput: styles.textInput
                    }}
                    fetchDetails
                    query={{
                        key: 'AIzaSyBOioG_vFXvfG6PeJ-ou4TSI9ytT6ImeG0',
                        language: 'en',
                    }}
                />
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {

        padding: 10,
        height: '100%',
        marginVertical: 5,

    },

    TextInput: {
        padding: 10,
        backgroundColor: '#eeee',
        marginVertical: 5,
        display: "flex",


    }


});
export default SearchBar
/*Note to add Google autocomplete - Important to have a billing Account** */