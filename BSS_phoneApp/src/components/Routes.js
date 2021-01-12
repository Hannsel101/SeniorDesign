import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../views/Home.js'
import About from '../views/About.js'
import Signup from '../views/Signup.js';

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial={true} />
            <Scene key="about" component={About} title="About" />
            <Scene key="signup" component={Signup} title="Signup"  />
        </Scene>
    </Router>
)

export default Routes