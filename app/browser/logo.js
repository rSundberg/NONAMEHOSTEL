import React, { Component } from 'react';
import anime from 'animejs';

import '../shared/css/logo.css'

import LogoIcon from '../shared/media/logo.svg'

export default class Logo extends Component {
    state = {
        click: 0
    }

    logoRef = React.createRef()

    click = () => this.setState({ click: this.state.click + 1 }, () => {
        console.log('ey')
        if (this.state.click >= 2) {
            anime({
                targets: this.logoRef.current,
                rotate: 180,
                easing: 'easeInOutQuad',
                duration: 850
            })
                .finished
                .then(() => this.props.onClick())
                .catch(err => console.log(err))
        }
    })

    render() {
        return (
            <div className={'Logo'}>
                <h1 className={'Logo__title'}>Welcome Home</h1>

                <div className={'Logo__container'} ref={this.logoRef}>
                    <div className={'Logo__button Logo__button--1'} onClick={() => this.click()}></div>
                    <div className={'Logo__button Logo__button--2'} onClick={() => this.click()}></div>

                    <LogoIcon />
                </div>
            </div>
        );
    }
}