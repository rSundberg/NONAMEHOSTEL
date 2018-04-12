import moment from 'moment'
import fetch from 'isomorphic-fetch'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import React from 'react'
import ReactDOM from 'react-dom'

import Booking from './components/booking'
import StartSection from './components/startsection'

import './app.css'

const config = {
    apiKey: "AIzaSyAMicQRJfWpjotCfxq9xs_VdO_6wvkeVyc",
    authDomain: "nonamehostel-a5e96.firebaseapp.com",
    databaseURL: "https://nonamehostel-a5e96.firebaseio.com",
    projectId: "nonamehostel-a5e96",
    storageBucket: "nonamehostel-a5e96.appspot.com",
    messagingSenderId: "459342338338"
};

firebase.initializeApp(config);

class App extends React.Component {
    render() {
        return (
            <div className={'App'}>
                <Booking />

                <div className={'Scrollable'}>
                    <StartSection />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))