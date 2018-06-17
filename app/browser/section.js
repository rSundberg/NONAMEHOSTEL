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
            width: [(this.contentRef.current.clientWidth + 1), (window.innerWidth * 0.9)]
        }).finished.then(this.props.activate)
        : null

    contentRef = React.createRef()

    render() {
        const {title, description, link, content, isOpen, activate} = this.props
        console.log(content)
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
                        ? content
                        : null
                    }
                </span>
            </div>
        )
    }
}