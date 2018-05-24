import React, { Component, Fragment } from 'react'
import anime from 'animejs'

import Logo from '../logo.svg'

export default class StartSection extends Component {
    state = {
        click: 0,
        loginDashboardToggled: false,
        email: null,
        password: null,
        user: null
    }

    loginDashboardRef = React.createRef()

    logoRef = React.createRef()

    click = () => this.setState({click: this.state.click + 1}, () => {
        if (this.state.click >= 2) {
            anime({
                targets: this.logoRef.current,
                rotate: 180,
                easing: 'easeInOutQuad',
                duration: 850
            }).finished.then(() => {
              this.props.toggleDashboard()
            })
        }
    })

    render() {
        return (
            <Fragment>
                <div className={'StartSection StartSection--1'}>
                    <div className={'App__logo-container'} ref={this.logoRef}>
                        <div className={'Dashboard__button Dashboard__button--1'} onClick={() => this.click()}></div>
                        <div className={'Dashboard__button Dashboard__button--2'} onClick={() => this.click()}></div>
                        <Logo className={'App__logo'}/>
                    </div>
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