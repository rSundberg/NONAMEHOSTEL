import React, { Component, Fragment } from 'react';

import '../shared/css/requisition.css'

export default class Requisition extends Component {
    state = {
        newPrice: null
    }
    
    updatePrice = e => {
        const { toggle, selected, doc } = this.props

        if (selected) {
            toggle(doc)
        }

        this.setState({ newPrice: e.target.value })
    }

    render() {
        const { created, item, amount, price} = this.props.doc.data()
        const {toggle, selected, doc} = this.props
        const updatedPrice = this.state.newPrice ? this.state.newPrice : price

        console.log(updatedPrice)
        return (
            <div className={`Requisition ${selected ? 'Requisition--active' : ''}`}>
                <span
                    className={'Requisition__info'}
                    onClick={() => toggle(doc, updatedPrice)}
                >
                    {item}
                </span>

                <span className={'Requisition__info'}>{amount}</span>

                <input
                    className={'Requisition__input'}
                    defaultValue={price}
                    type={'number'}
                    onChange={this.updatePrice}
                />
            </div>
        );
    }
}