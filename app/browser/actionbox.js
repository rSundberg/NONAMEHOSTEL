import React, { Component } from 'react'
import Anime from 'animejs'

import '../shared/css/actionbox.css'

import AddIcon from '../shared/media/add.svg'

export default class ActionBox extends Component {
    componentDidUpdate() {
        if (this.props.isOpen) {
            Anime({
                targets: this.icon.current,
                rotate: 45,
                duration: 300,
                easing: 'easeOutQuad'
            })
        }

        if (!this.props.isOpen) {
            Anime({
                targets: this.icon.current,
                rotate: 0,
                duration: 300,
                easing: 'easeOutQuad'
            })
        }
    }

    icon = React.createRef()

    render() {
        const {children, title, toggle, isOpen} = this.props

        return (
            <div className={'ActionBox'}>
                <div className={'ActionBox__title-wrapper'} onClick={() => toggle()}>
                    <span className={'ActionBox__title'}>{title}</span>

                    <span ref={this.icon}><AddIcon className={'ActionBox__icon'} /></span>
                </div>

                {isOpen ? children : null}
            </div>
        )
    }
}