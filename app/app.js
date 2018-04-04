import moment from 'moment';
import fetch from 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import Calendar from './components/calendar'
import bg from './bg.jpg'
import logo from './logo.jpg'

import './app.css'

class App extends React.Component {
    render() {
        return (
            <div className={'App'}>
                <div className={'App__homeInfo'}>
                    <img className={'App__logo'} src={logo} />
                    <div>
                        <h1>No name hostel</h1>
                        <h2>Crowdfunded, Volunteer-Based Traveler Community</h2>
                    </div>
                </div>
                <Calendar />
                <img className={'App__bg'} src={bg} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))