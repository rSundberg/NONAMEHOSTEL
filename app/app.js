import moment, { duration } from 'moment'
import fetch from 'isomorphic-fetch'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import localforage from 'localforage'
import anime from 'animejs'

import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'

import Booking from './components/booking'
import StartSection from './components/startsection'
import Dashboard from './components/dashboard'
import ToggleBooking from './components/toggleBooking'

import './app.css'

firebase.initializeApp({
    apiKey: "AIzaSyAMicQRJfWpjotCfxq9xs_VdO_6wvkeVyc",
    authDomain: "nonamehostel-a5e96.firebaseapp.com",
    databaseURL: "https://nonamehostel-a5e96.firebaseio.com",
    projectId: "nonamehostel-a5e96",
    storageBucket: "nonamehostel-a5e96.appspot.com",
    messagingSenderId: "459342338338"
});

localforage.config({
    name: 'noname hostel',
    version: 1.0
})

class App extends Component {
    state = {
        isMobile: /iPhone|iPod|Android/i.test(navigator.userAgent),
        dashboardToggled: false
    }

    bookingContainer = React.createRef()

    showContainer = React.createRef()

    toggleDashboard = () => {
        this.setState({ dashboardToggled: !this.state.dashboardToggled })
    }

    getBookingContainer = () => this.bookingContainer.current
    
    render() {
        return (
            <Fragment>
                <div className={`App`}>
                    {this.state.dashboardToggled
                        ? <Dashboard />
                        : null
                    }

                    <div className={'Scrollable'} ref={this.bookingContainer}>
                        <Booking />
                    </div>

                    <div className={'Scrollable'} ref={this.showContainer}>
                        <StartSection toggleDashboard={this.toggleDashboard} />
                    </div>
                </div>

                { this.state.isMobile
                    ? <ToggleBooking
                        getTarget={this.getBookingContainer}/>
                    : null
                }
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))