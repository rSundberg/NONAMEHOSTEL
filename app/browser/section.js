import React, { Component } from 'react'
import anime from 'animejs'

import '../shared/css/section.css'

export default class Section extends Component {
    backgroundRef = React.createRef()

    state = {
        backgroundAnimated: false,
        backgroundLoaded: false
    }

    componentDidMount() {
        if (!this.props.backgroundImage) return;
        console.log(this.backgroundRef)
        this.props.scrollElement.addEventListener('scroll', this.onScroll)
    }
    
    componentWillUnmount() {
        console.log(this.props.scrollElement)
        if (this.props.scrollElement) {
            this.props.scrollElement.removeEventListener('scroll', this.onScroll)
        }
    }

    onScroll = () => {
        let element = this.backgroundRef.current.getBoundingClientRect();
        let {width, transform} = this.props.backgroundStyle
        let offset = element.top - element.height

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        if (offset < 0 && !this.state.backgroundAnimated && this.state.backgroundLoaded) {
            this.setState({backgroundAnimated: true}, () => {
                anime({
                    targets: this.backgroundRef.current,
                    width: [width, width],
                    scale: [1.3, 1],
                    opacity: [{value: 0, duration: 0}, {value: 1, duration: 1000}],
                    translateX: [getRandomInt(-10, 10), transform.x],
                    translateY: [getRandomInt(10, 0), transform.y],
                    easing: 'easeOutQuart',
                    duration: 3000
                })
                .finished
                .then(() => this.props.scrollElement.removeEventListener('scroll', this.onScroll))
            })
        }
    }

    loadImage = () => {
        this.setState({backgroundLoaded: true})
    }

    render() {
        const {children, reference, backgroundImage, backgroundStyle} = this.props

        return (
            <div className={'Section'} ref={reference}>
                {backgroundImage
                    ? <img 
                            onLoad={this.loadImage}
                            className={'Section__background-image'}
                            src={backgroundImage}
                            ref={this.backgroundRef}
                        />
                    : null
                }

                { children }
            </div>
        )
    }
}