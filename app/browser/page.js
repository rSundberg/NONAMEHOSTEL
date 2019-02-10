import React, { Component, Fragment } from 'react'
import anime from 'animejs'

import '../shared/css/page.css'

export default class Page extends Component {
    pageRef = React.createRef()

    backButtonRef = React.createRef()

    componentDidUpdate(prevProps) {
        if (!prevProps.toggled) {
            this.open()
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.toggled === nextProps.toggled) {
            return false
        } else {
            return true
        }
    }

    toggleBackClick = () => {
        this.close().finished.then(this.props.backClick)
    }

    open = () => {
        anime({
            targets: this.backButtonRef.current,
            duration: 400,
            easing: 'easeOutQuart',
            translateY: ['20vw', '0vw']
        })

        anime({
            targets: this.pageRef.current,
            duration: 700,
            easing: 'easeOutQuart',
            translateX: ['-100vw', '0vw']
        })
    }

    close = () => {
        anime({
            targets: this.backButtonRef.current,
            duration: 400,
            easing: 'easeOutQuart',
            translateY: ['0vw', '20vw']
        })

        return anime({
            targets: this.pageRef.current,
            duration: 700,
            easing: 'easeOutQuart',
            translateX: ['0vw', '-100vw']
        })
    }

    render() {
        return (
            <Fragment>
                <div ref={this.backButtonRef} className={'Page__back-button'} onClick={this.toggleBackClick}>Go back</div>

                <div ref={this.pageRef} className={'Page'}>
                    {this.props.toggled ? this.props.children : null}
                </div>
            </Fragment>
        );
    }
}