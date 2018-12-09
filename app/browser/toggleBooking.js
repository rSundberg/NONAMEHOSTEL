import React, { Component } from 'react'
import anime from 'animejs'

export default class ToggleBooking extends Component {
    state = {
        animationDirection: 'out',
        bookingToggled: false,
        animating: false
    }

    toggleBookingContainer = React.createRef()

    componentDidMount() {
        if (!this.state.bookingToggled && window.scrollY === 0) {
            if (window.location.hash.substring(1) === 'staywithus') {
                setTimeout(() => {
                    this.toggleBookingContainer.current.click()
                }, 1000);
            }
        } else {
            this.setState({ bookingToggled: true }, () => this.props.toggle())
            this.getAnimation().play()
        }

        window.addEventListener('scroll', this.onWindowScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll)
    }

    onWindowScroll = e => {
        if (this.state.bookingToggled) {
            if (window.scrollY > this.props.getTarget().clientHeight) {
                if (this.state.animationDirection === 'in') return

                this.setState({ animationDirection: 'in' }, () => {
                    this.getAnimation().play()
                })
            } else {
                if (this.state.animationDirection === 'out') return

                this.setState({ animationDirection: 'out' }, () => {
                    this.getAnimation().play()
                })
            }
        }
    }

    getAnimation = () => {
        if (this.state.animationDirection === 'in') {
            return anime({
                targets: this.toggleBookingContainer.current,
                translateY: ['-6vh', '0vw'],
                duration: 650,
                easing: 'easeOutQuart',
                autoplay: false
            })
        } else {
            return anime({
                targets: this.toggleBookingContainer.current,
                translateY: ['0vw', '-6vh'],
                duration: 650,
                easing: 'easeInQuart',
                autoplay: false
            })
        }
    }

    toggleBooking = () => {
        if (this.state.animating) return

        this.setState({ animating: true })

        anime({
            targets: "html, body",
            scrollTop: [window.scrollY, 0],
            easing: 'easeInQuart',
            duration: window.scrollY > 0 ? 350 : 0,
            complete: () => this.setState({ animating: false })
        }).finished.then(() => {
            if (!this.state.bookingToggled) {
                this.setState({ bookingToggled: true }, () => {
                    this.props.toggle()
                    anime({
                        targets: this.props.getTarget(),
                        height: [0, window.innerHeight],
                        easing: 'easeOutQuart',
                        duration: 650
                    })
                    .finished
                    .then(() => {
                        return this.props.getTarget().removeAttribute('style')
                    })
                    .catch(err => console.log(err))
                })

                this.getAnimation().play()
            }

            return true
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className={'App__toggleBooking'} onClick={() => this.toggleBooking()} ref={this.toggleBookingContainer}>
                Book your stay
            </div>
        )
    }
}