import React, { Component } from 'react';
import anime from 'animejs';

import '../shared/css/landingPage.css'

export default class Logo extends Component {
    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => this.props.onClick(), 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
    }

    render() {
        return (
            <div className={'LandingPage'}>
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
                        onClick={() => this.props.onSectionClick('whatwedo')}>
                        A day at No Name
                    </div>

                    <div
                        className={'LandingPage__alternative'}
                        onClick={() => this.props.onSectionClick('whywedo')}>
                        Dream of Home Collective
                    </div>
                    
                    <div
                        className={'LandingPage__alternative'}
                        onClick={() => this.props.onSectionClick('howwedo')}>
                        Manifest the Experience
                    </div>
                </div>
            </div>
        );
    }
}