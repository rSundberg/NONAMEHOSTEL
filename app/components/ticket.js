import React, { Component } from 'react';

export default class Ticket extends Component {
    render() {
        return (
            <div className={'Ticket'}>
                {this.props.children}
            </div>
        );
    }
}