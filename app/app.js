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
        hideBooking: false,
        isMobile: /iPhone|iPod|Android/i.test(navigator.userAgent),
        bookingToggled: false,
        animationDirection: 'out'
    }

    bookingContainer = React.createRef()

    showContainer = React.createRef()

    toggleBookingContainer = React.createRef()

    componentDidMount() {
        if (!this.state.bookingToggled && this.state.isMobile && window.scrollY === 0) {
            anime({
                targets: this.bookingContainer.current,
                height: 0,
                easing: 'easeInQuart',
                duration: 0
            })
        } else {
            this.setState({bookingToggled: true})
            this.getAnimation().play()
        }

        window.onscroll = this.onWindowScroll
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.animating) {
            return false
        }

        return true
    }

    getAnimation = () => {
        if (this.state.animationDirection === 'in') {
            return anime({
                targets: this.toggleBookingContainer.current,
                translateX: ['40vw', '0vw'],
                duration: 650,
                easing: 'easeOutQuart',
                autoplay: false
            })
        } else {
            return anime({
                targets: this.toggleBookingContainer.current,
                translateX: ['0vw', '40vw'],
                duration: 650,
                easing: 'easeInQuart',
                autoplay: false
            })
        }
    }

    toggleBooking = () => {
        if (this.state.animating) return

        this.setState({ animating: true })

        anime({
            targets: "html, body",
            scrollTop: [window.scrollY, 0],
            easing: 'easeInQuart',
            duration: window.scrollY > 0 ? 650 : 0,
            complete: () => this.setState({animating: false})
        }).finished.then(() => {
            if (!this.state.bookingToggled) {
                this.setState({bookingToggled: true}, () => {
                    anime({
                        targets: this.bookingContainer.current,
                        height: [0, window.innerHeight],
                        easing: 'easeOutQuart',
                        duration: 850
                    }).finished.then(() => {
                        this.bookingContainer.current.removeAttribute('style')
                    })

                    this.getAnimation().play()
                })
            }
        })
    }

    onWindowScroll = e => {
        if (this.state.bookingToggled) {
            if (window.scrollY > this.bookingContainer.current.clientHeight) {
                if (this.state.animationDirection === 'in') return

                this.setState({animationDirection: 'in'}, () => {
                    this.getAnimation().play()
                })
            } else {
                if (this.state.animationDirection === 'out') return

                this.setState({animationDirection: 'out'}, () => {
                    this.getAnimation().play()
                })
            }
        }
    }
    
    render() {
        return (
            <Fragment>
                <div className={`App`}>
                    <div className={'Scrollable'} ref={this.bookingContainer}>
                        <Booking />
                    </div>

                    <div className={'Scrollable'} ref={this.showContainer}>
                        <StartSection toggleBooking={this.toggleBooking} />
                    </div>
                </div>

                { this.state.isMobile
                    ? <div className={'App__toggleBooking'} onClick={() => this.toggleBooking()} ref={this.toggleBookingContainer}>Book your stay</div>
                    : null
                }
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))