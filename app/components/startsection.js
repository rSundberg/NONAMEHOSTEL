import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'

import Logo from '../logo.svg'

export default class StartSection extends Component {
    state = {
        click1: false,
        click2: false,
        email: null,
        password: null,
        user: null
    }

    addClick1 = () => this.setState({click1: true})

    addClick2 = () => this.setState({click2: true})

    setEmail = event => this.setState({email: event.target.value})

    setPassword = event => this.setState({password: event.target.value})

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                this.setState({user: user})
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    render() {
        return (
            <Fragment>
                <div className={'Login'}>
                    {
                        this.state.click1 && this.state.click2 ?
                            <div className={'Login__dashboard'}>
                            {
                                !this.state.user ?
                                    <Fragment>
                                        <h1>Let us keep it a secret</h1>
                                        <div className={'Login__inputs'}>
                                            <input type={'email'} className={'Login__input'} placeholder={'Email'} onChange={this.setEmail}/>
                                            <input type={'password'} className={'Login__input'} placeholder={'Password'} onChange={this.setPassword}/>
                                        </div>
                                        <div className={'Login__button-login'} onClick={() => this.signIn()}>Sign in</div>
                                    </Fragment> :
                                    <div>
                                        We are now in dashboard with user {this.state.user.email}
                                    </div>
                            }
                            </div> : null
                    }

                    <div className={'Login__button Login__button--1'} onClick={() => this.addClick1()}></div>
                    <div className={'Login__button Login__button--2'} onClick={() => this.addClick2()}></div>
                </div>

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
            </Fragment>
        );
    }
}