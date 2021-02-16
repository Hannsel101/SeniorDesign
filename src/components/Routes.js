import React from 'react'
import { Router, Scene } from 'react-native-router-flux'

import Home from '../views/Home.js'
import Location from '../views/Location.js';
import Profile from '../views/Profile.js'
import Battery from '../views/Battery.js';
import History from '../views/History.js';
import Signup from '../views/Signup.js';
import About from '../views/About.js';
import Login from '../views/Login.js';
import BluetoothList from '../views/bluetooth/bluetooth-list';

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="bluetooth" component={BluetoothList} title="BLE Testing" initial={true}/>
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="profile" component={Profile} title="Profile"/>
            <Scene key="location" component={Location} title="Location" />
            <Scene key="history" component={History} title="History"/>
            <Scene key="signup" component={Signup} title="Signup"/>
            <Scene key="battery" component={Battery} title="Battery" />
            <Scene key="Login" component={Login} title="Login" />
            <Scene key="about" component={About} title="About" />
        </Scene>
    </Router>
)

export default Routes