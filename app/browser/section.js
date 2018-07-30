import React, { Component } from 'react'
import anime from 'animejs'

import '../shared/css/section.css'

export default class Section extends Component {
    shouldComponentUpdate(prevProps, prevState) {
        if (prevProps.isOpen === this.props.isOpen) {
            return false
        } else {
            return true
        }
    }

    showContent = () => !this.props.isOpen
        ? anime({
            targets: this.contentRef.current,
            easing: 'easeOutQuart',
            duration: 350,
            width: ['90%', '100%']
        }).finished.then(this.props.activate)
        : null

    contentRef = React.createRef()

    render() {
        const {title, description, link, children, isOpen, activate} = this.props

        return (
            <div className={'Section'}>
                <h1 className={'Section__title'}>
                    {title}
                </h1>

                <p className={'Section__description'}>
                    {description}
                </p>

                <span
                    ref={this.contentRef}
                    className={'Section__load-more'}
                    onClick={this.showContent}
                >
                    <span className={'Section__link'}>{link}</span>

                    { isOpen
                        ? children
                        : null
                    }
                </span>
            </div>
        )
    }
}