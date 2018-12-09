import React, { Component, Fragment } from 'react'
import anime from 'animejs'

import '../shared/css/page.css'

export default class Page extends Component {
    componentDidMount() {
        anime({
            targets: '.Page__back-button',
            duration: 400,
            easing: 'easeOutQuart',
            translateY: ['20vw', '0vw']
        })

        anime({
            targets: '.Page',
            duration: 700,
            easing: 'easeOutQuart',
            translateX: ['-100vw', '0vw']
        })
    }

    close = () => {
        anime({
            targets: '.Page__back-button',
            duration: 400,
            easing: 'easeOutQuart',
            translateY: ['0vw', '20vw']
        })

        anime({
            targets: '.Page',
            duration: 700,
            easing: 'easeOutQuart',
            translateX: ['0vw', '-100vw']
        }).finished.then(() => this.props.backClick())
    }

    render() {
        return (
            <Fragment>
                <div className={'Page__back-button'} onClick={this.close}>Go back</div>

                <div className={'Page'}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}