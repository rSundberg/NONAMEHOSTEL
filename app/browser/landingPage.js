import React, { Component } from 'react';
import anime from 'animejs';

import '../shared/css/landingPage.css'

import papaya_house from '../shared/media/papaya_house.jpg'
import palm_trees from '../shared/media/palm_trees.jpg'
import balcony_chill from '../shared/media/balcony_chill.jpg'
import FacebookIcon from '../shared/media/facebook.svg'
import InstagramIcon from '../shared/media/instagram.svg'
import GoogleIcon from '../shared/media/google.svg'

export default class LandingPage extends Component {
    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => this.props.onClick(), 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
    }

    goToUrl = url => window.open(url, '_blank')

    loadImage = e => {
        anime({
            targets: e.target,
            opacity: [0, 1],
            easing: 'easeOutQuart',
            duration: 500
        })
    }

    shouldComponentUpdate(nextProps) {
        return false
    }

    render() {
        const {isMobile, onSectionClick} = this.props
    
        return (
            <div className={'LandingPage'}>
                <div className={'LandingPage__head'}>
                    <div
                        onTouchStart={() => this.handleButtonPress()}
                        onTouchEnd={() => this.handleButtonRelease()}
                        onMouseDown={() => this.handleButtonPress()}
                        onMouseUp={() => this.handleButtonRelease()}
                    >
                        <h1 className={'App__title'}>
                            Welcome Home
                        </h1>
                    </div>

                    <div className={'LandingPage__social-links'}>
                        <FacebookIcon width={30} onClick={() => this.goToUrl('https://www.facebook.com/nonamehostel/')}/>

                        <InstagramIcon width={30} onClick={() => this.goToUrl('https://www.instagram.com/nonamehostel/')}/>

                        <GoogleIcon width={30} onClick={() => this.goToUrl('https://goo.gl/maps/tSCKQK8zTsq')}/>
                    </div>
                </div>

                <div className={'LandingPage__alternatives-wrapper'}>
                    <div className={'LandingPage__alternatives'}>
                        <div
                            className={'LandingPage__alternative'}
                            onClick={() => onSectionClick('whatwedo')}>
                            <h2 className={'LandingPage__title'}>No Name experience</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={papaya_house}
                                style={{
                                    transform: isMobile ? 'translateY(-25%)' : 'translateY(0%)'
                                }}
                                onLoad={this.loadImage}
                            />
                        </div>

                        <div
                            className={'LandingPage__alternative'}
                            onClick={() => onSectionClick('whywedo')}>
                            <h2 className={'LandingPage__title'}>A global network</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={palm_trees}
                                style={{
                                    transform: isMobile ? 'translateY(-35%)' : 'translateY(0%)'
                                }}
                                onLoad={this.loadImage}
                            />
                        </div>
                        
                        <div
                            className={'LandingPage__alternative'}
                            onClick={() => onSectionClick('howwedo')}>
                            <h2 className={'LandingPage__title'}>Help us manifest</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={balcony_chill}
                                style={{
                                    transform: isMobile ? 'translateY(-38%)' : 'translateY(0%)'
                                }}
                                onLoad={this.loadImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}