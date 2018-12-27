import anime from 'animejs';
import React, { Component, Fragment } from 'react'
import CancelIcon from '../shared/media/cancel.svg'


export default class Box extends Component {
    shouldComponentUpdate({isOpen}) {
        if (!isOpen && this.props.isOpen === false) {
            return false
        } else {
            return true
        }
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.open()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.open()
        }
        
        if (!this.props.isOpen && prevProps.isOpen) {
            this.close()
        }
    }

    boxRef = React.createRef()

    titleRef = React.createRef()

    open = () => {
        anime({
            targets: this.boxRef.current,
            translateX: ['-100vw', 0],
            easing: 'easeInOutQuart',
            duration: 250,
        })

        anime({
            targets: this.titleRef.current,
            translateX: [0, '100vw'],
            easing: 'easeInOutQuart',
            duration: 250,
        })
    }

    close = () => {
        anime({
            targets: this.boxRef.current,
            translateX: [0, '-100vw'],
            easing: 'easeOutQuart',
            duration: 250
        }).finished.then(() => {
            this.boxRef.current.style = ''
        })

        anime({
            targets: this.titleRef.current,
            translateX: ['100vw', 0],
            easing: 'easeOutQuart',
            duration: 250,
        }).finished.then(() => {
            this.titleRef.current.style = ''
        })
    }

    triggerClick = () => this.props.onClick(this.props.id)

    render() {
        const {name, id, isOpen, onClick, children} = this.props

        return (
            <Fragment>
                <span
                    className={'Dashboard__box-title'}
                    ref={this.titleRef}
                    onClick={this.triggerClick}
                >
                    {name}
                </span>

                <div
                    className={'Dashboard__content-box'}
                    ref={this.boxRef}
                >
                    <span className={'Dashboard__content-navigation'}>
                        <h2 className={'Dashboard__navigation-title'}>{name}</h2>

                        <CancelIcon className={'Dashboard__close-icon'} onClick={this.triggerClick} />
                    </span>

                    {isOpen ? children : null}
                </div>
            </Fragment>
        )
    }
}