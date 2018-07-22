import React, { Component } from 'react';
import anime from 'animejs';

import '../shared/css/loader.css'

export default class Loader extends Component {
    container = React.createRef()
    circleRef1 = React.createRef()
    circleRef2 = React.createRef()
    circleRef3 = React.createRef()

    componentDidMount() {
        if (this.props.pastDelay) {
            this.animate()
        }
    }

    componentDidUpdate() {
        if (this.props.pastDelay) {
            this.animate()
        }
    }

    animate = () => {
        anime({
            targets: this.container.current,
            opacity: [0, 1],
            easing: 'easeOutQuart',
            duration: 650
        })

        anime({
            targets: [this.circleRef1.current, this.circleRef2.current, this.circleRef3.current],
            scale: (el, i) => [i + 1, i * 3],
            delay: (el, i) => 100 + (i * 100),
            duration: (el, i) => 50 + (i * (i * 80)),
            rotate: (el, i) => [i, 45],
            easing: 'easeInOutQuart',
            loop: true,
            direction: 'alternate'
        })
    }

    render() {
        return (
            <div className={'Loader'} style={{height: `${this.props.height}vh`}} ref={this.container}>
                <div className={'Loader__circle-box'}>
                    <div className={'Loader__circle'} ref={this.circleRef1}></div>
                    <div className={'Loader__circle'} ref={this.circleRef2}></div>
                    <div className={'Loader__circle'} ref={this.circleRef3}></div>
                </div>
                <div className={'Loader__title'}>
                    Loading {this.props.title}
                </div>
            </div>
        );
    }
}