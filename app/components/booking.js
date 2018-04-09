import React, { Component } from 'react';

import Calendar from './calendar'
import Locations from './locations'
import Beds from './beds'
import Details from './details'

export default class Booking extends Component {
    render() {
        return (
            <div className={'Booking'}>
                <h2 className={'Booking__title'}>
                    Stay with us!
                </h2>

                <Calendar/>
                <Locations/>
                <Beds/>
                <Details />
            </div>
        );
    }
}