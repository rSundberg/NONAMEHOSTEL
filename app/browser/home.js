import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'
import anime from 'animejs'

import {importFirebase, importLocalforage, importMoment} from '../shared/utils'

import ToggleBooking from './toggleBooking'
import Loader from './loader'
import LandingPage from './landingPage'
import Page from './page'

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
        moment: () => importMoment()
    },
    loading: defaultProps => <Loader {...defaultProps} height={70} title={'Booking'} />,
    delay: 600,
    render: ({Booking, localforage, moment}, props) => <Booking.default localforage={localforage} moment={moment} {...props} />
})

const StartSection = Loadable({
    loader: () => import(/* webpackChunkName: 'startsection' */ './startsection'),
    loading: defaultProps => <Loader {...defaultProps} height={100} title={'Info'} />,
    delay: 600
})

const Volunteer = Loadable({
    loader: () => import(/* webpackChunkName: 'volunteer' */ './volunteer'),
    loading: defaultProps => <Loader {...defaultProps} />
})

const Membership = Loadable({
    loader: () => import(/* webpackChunkName: 'membership' */ './membership'),
    loading: defaultProps => <Loader {...defaultProps} />
})

export default class Home extends Component {
    state = {
        isMobile: /iPhone|iPod|Android|iPad/i.test(navigator.userAgent),
        dashboardToggled: false,
        activeSection: null,
        volunteerToggled: false,
        membershipToggled: false,
        bookingToggled: false
    }

    bookingContainer = React.createRef()

    showContainer = React.createRef()

    componentDidMount() {
        if (!this.state.isMobile) {
            this.setState({bookingToggled: true})
        }

        let hashLink = window.location.hash.substring(1)

        if (hashLink === 'whatwedo' || 'howwedo' || 'whywedo' || 'volunteer') {
            this.setActiveSection(hashLink)
        }
    }

    toggleDashboard = () => {
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

    setActiveSection = section => this.setState({activeSection: section})

    toggleBooking = () => this.setState({bookingToggled: true})

    toggleVolunteer = () => this.setState(({ volunteerToggled }) => ({ volunteerToggled: !volunteerToggled }))

    toggleMembership = () => this.setState(({ membershipToggled }) => ({ membershipToggled: !membershipToggled}))

    render() {
        const {dashboardToggled, membershipToggled, volunteerToggled, bookingToggled, isMobile, activeSection} = this.state

        return (
            <div className={`App`}>
                {!dashboardToggled || <Dashboard backClick={this.toggleDashboard} />}

                {dashboardToggled ||
                    <Fragment>
                        <Page backClick={this.toggleVolunteer} toggled={volunteerToggled}>
                            <Volunteer />
                        </Page>

                        <Page backClick={this.toggleMembership} toggled={membershipToggled}>
                            <Membership />
                        </Page>

                        <div
                            className={'Scrollable'}
                            style={{
                                transform: isMobile ? '' : 'scaleX(-1)'
                            }}
                            ref={this.bookingContainer}
                        >
                            {bookingToggled
                                ? <Booking isMobile={isMobile} />
                                : null
                            }
                        </div>

                        <div className={'Scrollable'} ref={this.showContainer}>
                            <LandingPage
                                onSectionClick={this.setActiveSection}
                                isMobile={isMobile}
                            />

                            <StartSection
                                activeSection={activeSection}
                                scrollTarget={isMobile ? 'html, body' : this.showContainer.current }
                                toggleVolunteer={this.toggleVolunteer}
                                toggleMembership={this.toggleMembership}
                                isMobile={isMobile}
                                container={this.showContainer.current}
                            />
                        </div>
                    </Fragment>
                }

                {isMobile && !dashboardToggled
                    ? <ToggleBooking getTarget={this.getBookingContainer} toggle={this.toggleBooking} />
                    : null
                }
            </div>
        )
    }
}