import React, { Component, Fragment } from 'react'
import anime from 'animejs'
import Loadable from 'react-loadable'

import '../shared/css/dashboard.css'

import Box from './box'
import CheckIn from './checkIn'
import Members from './members'

import Back from '../shared/media/back.svg'

export default class Dashboard extends Component {
    state = {
        click: 0,
        email: null,
        password: null,
        user: null,
        activeBox: null,
        boxes: ['Check in', 'Calendar', 'Activities', 'Home collective members', 'Bookings']
    }

    dashboardRef = React.createRef()

    setEmail = event => this.setState({ email: event.target.value })

    setPassword = event => this.setState({ password: event.target.value })

    signIn = () => {
        this.props.auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    signOut = () => {
        this.props.auth
        .signOut()
        .then(() => this.setState({user: null}))
        .catch(err => console.log(err))
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.activeBox === this.state.activeBox && this.state.user) {
            return false
        } else {
            return true
        }
    }

    componentDidMount() {
        anime({
            targets: this.dashboardRef.current,
            duration: 650,
            easing: 'easeInQuart',
            opacity: [0, 1]
        })

        this.props.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user })
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    getBoxContent = box => {
        if (box === 'Check in') {
            return <CheckIn
                firestore={this.props.firestore}
                auth={this.props.auth}
                moment={this.props.moment}
            />
        } else if (box === 'Home collective members') {
            return <Members
                firestore={this.props.firestore}
                storage={this.props.storage}
                moment={this.props.moment}
            />
        } else {
            return null
        }
    }

    setActiveBox = boxId => this.setState({activeBox: boxId})

    render() {
        const {boxes, activeBox, user} = this.state

        return (
            <div className={'Dashboard'} ref={this.dashboardRef}>
                {
                    !user ?
                        <div className={'Dashboard__login'}>
                            <h1 className={'Dashboard__title'}>Let's keep it a secret</h1>
                            <div className={'Dashboard__inputs'}>
                                <form>
                                    <input type={'email'} className={'Dashboard__input'} placeholder={'Email'} onChange={this.setEmail} />
                                    <input type={'password'} className={'Dashboard__input'} placeholder={'Password'} onChange={this.setPassword} />
                                </form>
                            </div>
                        </div> :
                        <div className={'Dashboard__home'}>
                            <div className={'Dashboard__account-info'}>
                                <h1 className={'Dashboard__title'}>Welcome</h1>
                                <span>
                                    {this.state.user.email}
                                </span>
                            </div>

                            {boxes.map((box, i) =>
                                <Box key={i} name={box} id={i} isOpen={activeBox === i} onClick={this.setActiveBox}>
                                    {this.getBoxContent(box)}
                                </Box>
                                )
                            }
                        </div>
                }

                <div className={'Dashboard__action-box'}>
                    <span
                        className={`Dashboard__action Dashboard__action--${user ? 'logged-in' : 'logged-out'}`}
                        onClick={() => user ? this.signOut() : this.signIn()}
                    >
                        {user ? 'Logout' : 'Login'}
                    </span>

                    <span className={'Dashboard__back'} onClick={() => this.props.backClick()}>
                        <Back />
                    </span>
                </div>
            </div>
        )
    }
}