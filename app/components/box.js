import React, { Component } from 'react'
import anime from 'animejs'

export default class Box extends Component {
    componentDidMount() {
        if (this.props.isOpen) {
            this.open()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.open()
        }
        
        if (!this.props.isOpen && prevProps.isOpen) {
            this.close()
        }
    }

    boxRef = React.createRef()

    open = () => anime({
        targets: this.boxRef.current,
        width: ['90vw', '100vw'],
        minHeight: ['12vh', '90vh'],
        easing: 'easeOutQuart',
        duration: 250,
    }).finished.then(() => {
        anime({
            targets: 'html, body',
            scrollTop: [window.scrollY, this.boxRef.current.offsetTop],
            easing: 'easeOutQuart',
            duration: 150
        })
    })

    close = () => anime({
        targets: this.boxRef.current,
        width: ['100vw', '90vw'],
        minHeight: [this.boxRef.current.clientHeight, '12vh'],
        easing: 'easeOutQuart',
        duration: 250
    })

    render() {
        const {name, id, isOpen, onClick, children} = this.props

        return (
            <div className={`Dashboard__content-box`} onClick={() => onClick(id)} ref={this.boxRef}>
                {isOpen ? '' : name}

                {isOpen ? children : null}
            </div>
        )
    }
}