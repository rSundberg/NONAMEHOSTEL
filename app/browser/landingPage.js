import React, { Component } from 'react';
import anime from 'animejs';

import '../shared/css/landingPage.css'

import papaya_house from '../shared/media/papaya_house.jpg'

export default class Logo extends Component {
    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => this.props.onClick(), 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
    }

    render() {
        const {isMobile, onSectionClick} = this.props
        return (
            <div className={'LandingPage'}>
                <img
                    className={'Section__background-image'}
                    src={papaya_house}
                    style={{
                        opacity: 1,
                        width: isMobile ? '100%' : '65%',
                        transform: isMobile ? 'translate(-5%, 0%)' : 'translate(25%, 0%)'
                    }}
                />

                <h1
                    className={'App__title'}
                    onTouchStart={() => this.handleButtonPress()}
                    onTouchEnd={() => this.handleButtonRelease()}
                    onMouseDown={() => this.handleButtonPress()}
                    onMouseUp={() => this.handleButtonRelease()}>
                    Welcome Home
                </h1>

                <div className={'LandingPage__alternatives'}>
                    <div
                        className={'LandingPage__alternative'}
                        onClick={() => onSectionClick('whatwedo')}>
                        A day at No Name
                    </div>

                    <div
                        className={'LandingPage__alternative'}
                        onClick={() => onSectionClick('whywedo')}>
                        Dream of Home Collective
                    </div>
                    
                    <div
                        className={'LandingPage__alternative'}
                        onClick={() => onSectionClick('howwedo')}>
                        Manifest the Experience
                    </div>
                </div>
            </div>
        );
    }
}