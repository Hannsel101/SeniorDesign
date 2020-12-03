import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

          <Image style={styles.image} source={require("./assets/greenBattery.png")} />

          <View style={styles.inputView}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Email..."
                  placeholderTextColor="#003f5c"
                  on1ChangeText={(email) => setEmail(email)}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Password..."
                  placeholderTextColor="#003f5c"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
              />
          </View>

          <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },

    image: {
        flex: 1,
        marginBottom: 40,
        marginTop: 25,
        backgroundColor: '#20e866',
        width: "100%",
        height: "30%",
        resizeMode: 'contain',
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "65%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 25,
        color: "#0cb1f7",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 25,
        backgroundColor: "#FF1493",
    },

    loginText: {
        
    }
});