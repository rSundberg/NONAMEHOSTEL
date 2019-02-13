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
        console.log('ey')
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
        return nextProps.activeSection !== this.props.activeSection
    }

    render() {
        const {isMobile, onSectionClick, activeSection} = this.props
    
        return (
            <div className={`LandingPage`}>
                <div className={'LandingPage__head'}>
                    <div>
                        <h1
                            className={'App__title'}
                            onTouchStart={() => this.handleButtonPress()}
                            onTouchEnd={() => this.handleButtonRelease()}
                            onMouseDown={() => this.handleButtonPress()}
                            onMouseUp={() => this.handleButtonRelease()}
                        >
                            Welcome Home
                        </h1>
                    </div>

                    <div className={'LandingPage__social-links'}>
                        <FacebookIcon width={30} onClick={() => this.goToUrl('https://www.facebook.com/nonamehostel/')}/>

                        <InstagramIcon width={30} onClick={() => this.goToUrl('https://www.instagram.com/nonamehostel/')}/>

                        <GoogleIcon width={30} onClick={() => this.goToUrl('https://goo.gl/maps/tSCKQK8zTsq')}/>
                    </div>
                </div>

                <div className={`LandingPage__alternatives-wrapper ${activeSection ? 'LandingPage__alternatives-wrapper--sticky' : ''}`}>
                    <div className={`LandingPage__alternatives ${activeSection ? 'LandingPage__alternatives--sticky' : ''}`}>
                        <div
                            className={`LandingPage__alternative ${activeSection ? 'LandingPage__alternative--sticky' : ''}`}
                            onClick={() => onSectionClick('whatwedo')}>
                            <h2 className={`
                                LandingPage__title
                                ${activeSection ? 'LandingPage__title--sticky' : ''}
                                ${activeSection === 'whatwedo' ? 'LandingPage__title--active' : ''}
                            `}>No Name experience</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={papaya_house}
                                style={{
                                    transform: isMobile
                                        ? 'translateY(-25%)'
                                        : activeSection
                                            ? 'translateY(-15%)'
                                            : 'translateY(0%)'
                                }}
                                onLoad={this.loadImage}
                            />
                        </div>

                        <div
                            className={`LandingPage__alternative ${activeSection ? 'LandingPage__alternative--sticky' : ''}`}
                            onClick={() => onSectionClick('whywedo')}>
                            <h2 className={`
                                LandingPage__title
                                ${activeSection ? 'LandingPage__title--sticky' : ''}
                                ${activeSection === 'whywedo' ? 'LandingPage__title--active' : ''}
                            `}>A global network</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={palm_trees}
                                style={{
                                    transform: isMobile
                                        ? 'translateY(-35%)'
                                        : activeSection
                                            ? 'translateY(-25%)'
                                            : 'translateY(0%)'
                                }}
                                onLoad={this.loadImage}
                            />
                        </div>
                        
                        <div
                            className={`LandingPage__alternative ${activeSection ? 'LandingPage__alternative--sticky' : ''}`}
                            onClick={() => onSectionClick('howwedo')}>
                            <h2 className={`
                                LandingPage__title
                                ${activeSection ? 'LandingPage__title--sticky' : ''}
                                ${activeSection === 'howwedo' ? 'LandingPage__title--active' : ''}
                            `}>Help us manifest</h2>

                            <img
                                className={'LandingPage__background-image'}
                                src={balcony_chill}
                                style={{
                                    transform: isMobile
                                        ? 'translateY(-38%)'
                                        : activeSection
                                            ? 'translateY(-35%)'
                                            : 'translateY(0%)'
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