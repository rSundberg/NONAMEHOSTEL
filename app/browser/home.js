import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'
import anime from 'animejs'

import {importFirebase, importLocalforage, importMoment} from '../shared/utils'

import ToggleBooking from './toggleBooking'
import Loader from './loader'
import Logo from './logo'

const config = {
    apiKey: "AIzaSyAMicQRJfWpjotCfxq9xs_VdO_6wvkeVyc",
    authDomain: "nonamehostel-a5e96.firebaseapp.com",
    databaseURL: "https://nonamehostel-a5e96.firebaseio.com",
    projectId: "nonamehostel-a5e96",
    storageBucket: "nonamehostel-a5e96.appspot.com",
    messagingSenderId: "459342338338"
}

const Dashboard = Loadable.Map({
    loader: {
        Dashboard: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
        firebase: () => importFirebase(config, [
            import('firebase/firestore'),
            import('firebase/auth'),
            import('firebase/functions'),
            import('firebase/storage')
        ]).then(services => services),
        moment: () => importMoment()
    },
    loading: defaultProps => <Loader {...defaultProps} height={100} title={'Dashboard'}/>,
    delay: 600,
    render: ({Dashboard, firebase, moment}, props) => <Dashboard.default {...firebase} moment={moment} {...props}/>
})

const Booking = Loadable.Map({
    loader: {
        Booking: () => import(/* webpackChunkName: 'booking' */ './booking'),
        moment: () => importMoment(),
        localforage: () => importLocalforage()
    },
    loading: defaultProps => <Loader {...defaultProps} height={100} title={'Booking'} />,
    delay: 600,
    render: ({Booking, localforage, moment}, props) => <Booking.default localforage={localforage} moment={moment} {...props} />
})

const StartSection = Loadable({
    loader: () => import(/* webpackChunkName: 'startsection' */ './startsection'),
    loading: defaultProps => <Loader {...defaultProps} height={100} title={'Info'} />,
    delay: 600
})

export default class Home extends Component {
    state = {
        isMobile: /iPhone|iPod|Android/i.test(navigator.userAgent),
        dashboardToggled: false,
        click: 0
    }

    bookingContainer = React.createRef()

    showContainer = React.createRef()

    toggleDashboard = () => {
        console.log('toggle')

        if (this.state.dashboardToggled) {
            anime({
                targets: ['.Dashboard'],
                opacity: [1, 0],
                duration: 650,
                easing: 'easeOutQuart'
            })
            .finished
            .then(() => this.setState({ dashboardToggled: !this.state.dashboardToggled }, () => {
                anime({
                    targets: [this.bookingContainer.current, this.showContainer.current, '.App__toggleBooking'],
                    opacity: [0, 1],
                    duration: 650,
                    easing: 'easeInQuart'
                })
            }))
            .catch(err => console.log(err))
        } else {
            anime({
                targets: [this.bookingContainer.current, this.showContainer.current, '.App__toggleBooking'],
                opacity: [1, 0],
                duration: 650,
                easing: 'easeInQuart'
            })
            .finished
            .then(() => this.setState({ dashboardToggled: !this.state.dashboardToggled, click: 0 }))
            .catch(err => console.log(err))
        }

    }

    getBookingContainer = () => this.bookingContainer.current

    render() {
        return (
            <div className={`App`}>
                {!this.state.dashboardToggled || <Dashboard backClick={this.toggleDashboard} />}

                {this.state.dashboardToggled ||
                    <Fragment>
                        <div className={'Scrollable'} ref={this.bookingContainer}>
                            <Booking isMobile={this.state.isMobile} />
                        </div>

                        <div className={'Scrollable'} ref={this.showContainer}>
                            <Logo onClick={this.toggleDashboard} />
                            <StartSection />
                        </div>
                    </Fragment>
                }

                {this.state.isMobile && !this.state.dashboardToggled
                    ? <ToggleBooking getTarget={this.getBookingContainer} />
                    : null
                }
            </div>
        )
    }
}