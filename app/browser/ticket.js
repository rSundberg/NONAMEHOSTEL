import React, { Component } from 'react';

import '../shared/css/ticket.css';

export default class Ticket extends Component {
    render() {
        return (
            <div className={'Ticket'}>
                {this.props.children}
            </div>
        );
    }
}