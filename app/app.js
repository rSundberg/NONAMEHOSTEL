import moment from 'moment';
import fetch from 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import Booking from './components/booking'

import Logo from './logo.svg'

import './app.css'

class App extends React.Component {
    render() {
        return (
            <div className={'App'}>
                <div className={'Scrollable'}>
                    <Booking />
                </div>

                <div className={'Scrollable'}>
                    <div className={'StartSection StartSection--1'}>
                        <Logo className={'App__logo'}/>
                        <h1>No name hostel</h1>
                        <h2>Crowdfunded, Volunteer-Based Traveler Community</h2>
                    </div>
                    <div className={'StartSection StartSection--2'}>
                        <h1 className={'StartSection__title'}>
                            Make the life changing experience of travel accessible to everyone
                        </h1>
                    </div>
                    <div className={'StartSection StartSection--3'}>
                        <h1 className={'StartSection__title'}>
                            Join our family of friends and strangers,
                            all part of a greater global community named Home Collective.
                        </h1>
                    </div>
                    <div className={'StartSection StartSection--4'}>
                        <h1 className={'StartSection__title'}>
                            Help Home Collective and express your freedom
                            through co - creation, contribute to
                            the vision in your unique way.
                        </h1>
                    </div>
                    <div className={'StartSection StartSection--5'}>
                        <h1 className={'StartSection__title'}>
                            We are looking for new friends! Are you interested in volunteering?
                            Join our volunteer program.
                        </h1>
                    </div>
                </div>
                <div className={'Background'}>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))