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
import Test from '../views/test.js';
import SearchBar from '../views/SearchBar';
import Google from '../views/Google';
import Batteryinfo from '../views/Batteryinfo';

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial={true}  />
            <Scene key="searchbar" component={SearchBar} title="Search Location" />
            <Scene key="profile" component={Profile} title="Profile"/>
            <Scene key="location" component={Location} title="Location"   />
            <Scene key="history" component={History} title="History"/>
            <Scene key="signup" component={Signup} title="Signup"/>
            <Scene key="battery" component={Battery} title="Battery" />
            <Scene key="Login" component={Login} title="Login" />
            <Scene key="about" component={About} title="About" />
            <Scene key="test" component={Test} title="Test" />
            <Scene key="google" component={Google} title="Google" />
            <Scene key="batteryinfo" component={Batteryinfo} title="Batteryinfo"   />
        </Scene>
    </Router>
)

export default Routes