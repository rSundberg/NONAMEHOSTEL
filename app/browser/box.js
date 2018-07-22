import anime from 'animejs';
import React, { Component, Fragment } from 'react'
import CancelIcon from '../shared/media/cancel.svg'
import Swipeable from 'react-swipeable'


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
            targets: this.boxRef,
            translateX: ['-100vw', 0],
            easing: 'easeInOutQuart',
            duration: 250,
        })

        anime({
            targets: this.titleRef,
            translateX: [0, '100vw'],
            easing: 'easeInOutQuart',
            duration: 250,
        })
    }

    close = () => {
        anime({
            targets: this.boxRef,
            translateX: [0, '-100vw'],
            easing: 'easeOutQuart',
            duration: 250
        }).finished.then(() => {
            this.boxRef.style = ''
        })

        anime({
            targets: this.titleRef,
            translateX: ['100vw', 0],
            easing: 'easeOutQuart',
            duration: 250,
        }).finished.then(() => {
            this.titleRef.style = ''
        })
    }

    triggerClick = (e, deltaY, isFlick) => {
        if (isFlick) {
            this.props.onClick(this.props.id)
        }
    }

    render() {
        const {name, id, isOpen, onClick, children} = this.props

        return (
            <Fragment>
                <span>
                    <Swipeable
                        className={'Dashboard__box-title'}
                        innerRef={(el) => this.titleRef = el}
                        onSwipedRight={this.triggerClick}
                    >
                        {name}
                    </Swipeable>
                </span>

                <Swipeable
                    className={'Dashboard__content-box'}
                    innerRef={(el) => this.boxRef = el}
                    onSwipedLeft={this.triggerClick}
                    flickThreshold={1}
                >
                    {children}
                </Swipeable>
            </Fragment>
        )
    }
}