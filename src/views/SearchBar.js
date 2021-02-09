import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, StatusBar, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchBar = () => {
    /*Store state variable and use later to find routes ** */
    const [CurrentText, setCurrentText] = useState('');
    const [DestinationText, setDestinationText] = useState('');
    return (
        /*Adding Autofill location here using Google auto** */
        <SafeAreaView>
            <View style={styles.container}>
                
                <TextInput style={styles.TextInput} value={CurrentText} onChangeText={setCurrentText} placeholder='Current Location ...' />
                <TextInput style={styles.TextInput} value={DestinationText} onChangeText={setDestinationText} placeholder='Destination Location ...' />
                
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
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
       
        height:'100%',
        marginVertical: 5,
        
    },

    TextInput: {
        padding: 10,
        backgroundColor: '#eeee',
        marginVertical: 5,
        

    }


});
export default SearchBar
/*Note to add Google autocomplete - Important to have a billing Account** */