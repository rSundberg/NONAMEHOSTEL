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

        this.props.scrollElement.addEventListener('scroll', this.onScroll)
    }
    
    componentWillUnmount() {
        if (this.props.scrollElement) {
            this.props.scrollElement.removeEventListener('scroll', this.onScroll)
        }
    }

    onScroll = () => {
        let element = this.backgroundRef.current.getBoundingClientRect();
        let {width, transform} = this.props.backgroundStyle
        let offset = element.top

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        if (offset < 0 && !this.state.backgroundAnimated && this.state.backgroundLoaded) {
            console.log(offset)
            this.setState({backgroundAnimated: true}, () => {
                anime({
                    targets: this.backgroundRef.current,
                    width: [width, width],
                    scale: [1.1, 1],
                    opacity: [{value: 0, duration: 0}, {value: 1, duration: 4000}],
                    translateX: [getRandomInt(-5, 5), transform.x],
                    translateY: [getRandomInt(5, 0), transform.y],
                    easing: 'easeOutQuart',
                    duration: 12000
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