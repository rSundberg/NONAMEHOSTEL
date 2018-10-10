import React, { Component } from 'react'
import anime from 'animejs'

import '../shared/css/section.css'

export default class Section extends Component {
    render() {
        const {children, reference} = this.props

        return (
            <div className={'Section'} ref={reference}>
                { children }
            </div>
        )
    }
}