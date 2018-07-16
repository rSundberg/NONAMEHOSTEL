import React, { Component } from 'react';

import '../shared/css/requisition.css'

export default class Requisition extends Component {
    state = {

    }

    render() {
        const {category, created, items} = this.props.doc.data()

        return (
            <div className={'Requisition'}>
                <h2 className={'Requisition'}>
                    {category}
                </h2>

                {
                    items.map(({item, amount, price}) =>
                        <div className={'Requisition__item'}>
                            <span>{item}</span>
                            <span>{amount}</span>
                            <span>{price}</span>
                        </div>
                    )
                }
            </div>
        );
    }
}