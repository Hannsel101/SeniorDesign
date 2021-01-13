import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../views/Home.js'
import About from '../views/About.js'
import Profile from '../views/Profile.js'
import Login from '../views/Login.js'


const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="Login" component={Login} title="Login" />
            <Scene key="home" component={Home} title="Home"  initial={true}/>
            <Scene key="profile" component={Profile} title="Profile"/>
            <Scene key="about" component={About} title="About" />
           
        </Scene>
    </Router>
)

export default Routes