import React, { Component } from 'react'
import anime from 'animejs'

import '../shared/css/section.css'

export default class Section extends Component {
    shouldComponentUpdate() {
        return false
    }

    loadImage = e => {
        anime({
            targets: e.target,
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuart'
        })
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
                            style={backgroundStyle}
                        />
                    : null
                }

                { children }
            </div>
        )
    }
}