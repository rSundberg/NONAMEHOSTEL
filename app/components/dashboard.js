import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'
import anime from 'animejs'

export default class Dashboard extends Component {
    state = {
        click: 0,
        email: null,
        password: null,
        user: null
    }

    dashboardRef = React.createRef()

    setEmail = event => this.setState({ email: event.target.value })

    setPassword = event => this.setState({ password: event.target.value })

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    componentDidMount() {
        anime({
            targets: this.dashboardRef.current,
            duration: 1200,
            easing: 'easeInQuart',
            width: [0, '100vw']
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user })
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    render() {
        return (
            <div className={'Dashboard'} ref={this.dashboardRef}>
                {
                    !this.state.user ?
                        <div className={'Dashboard__login'}>
                            <h1>Let us keep it a secret</h1>
                            <div className={'Login__inputs'}>
                                <input type={'email'} className={'Login__input'} placeholder={'Email'} onChange={this.setEmail} />
                                <input type={'password'} className={'Login__input'} placeholder={'Password'} onChange={this.setPassword} />
                            </div>
                            <div className={'Login__button-login'} onClick={() => this.signIn()}>Sign in</div>
                        </div> :
                        <div className={'Dashboard__home'}>
                            We are now in dashboard with user {this.state.user.email}
                        </div>
                }
            </div>
        )
    }
}