import React, { Component } from 'react';

import Calendar from './calendar'
import Locations from './locations'
import Beds from './beds'
import Details from './details'

export default class Booking extends Component {
    state = {
        start_date: null,
        end_date: null,
        location: null,
        bed_type: null,
        name: null,
        email: null,
        phone: null,
        message: null
    }

    dateRange = (start, end) => this.setState({start_date: start, end_date: end})

    currentLocation = (location) => this.setState({location: location})

    pickBed = (bed) => this.setState({bed_type: bed});
    
    customerDetails = (details) => this.setState(details)

    render() {
        return (
            <div className={'Booking'}>
                <h2 className={'Booking__title'}>
                    Stay with us!
                </h2>

                <Calendar getDate={this.dateRange}/>
                <Locations getLocation={this.currentLocation}/>
                <Beds getBed={this.pickBed}/>
                <Details getDetails={this.customerDetails}/>
            </div>
        );
    }
}