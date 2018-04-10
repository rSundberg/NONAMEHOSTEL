import React, { Component } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'

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
        bed_count: null,
        name: null,
        email: null,
        phone: null,
        message: null,
        country: null
    }

    db = firebase.firestore();

    bookings = this.db.collection("locations").doc("goa").collection('bookings');

    dateRange = (start, end) => this.setState({start_date: start, end_date: end})

    currentLocation = (location) => this.setState({location: location})

    pickBed = (bedInfo = {}) => this.setState(bedInfo)
    
    customerDetails = (details) => this.setState(details)

    sendDetails = () => {
        this.bookings.add(this.state)
    }

    componentDidMount = () => {
        this.bookings.where("name", "==", "robin").get().then(query => {
            query.forEach(doc => {
                console.log(doc.data())
            })
        })
    }

    render() {
        const {start_date, end_date, location, bed_type, bed_count} = this.state
        let test = start_date ? moment(start_date).format('MM dd YY') : 'fail'
        console.log(test)
        return (
            <div className={'Booking'}>
                <h2 className={'Booking__title'}>
                    Stay with us!
                </h2>

                <Calendar getDate={this.dateRange}/>
                <Locations getLocation={this.currentLocation}/>
                <Beds getBed={this.pickBed}/>
                <Details getDetails={this.customerDetails}/>

                <div className={'Booking__confirm'} onClick={() => this.sendDetails}>
                    <div>
                        {location} {location ? ' - ' : ''} {bed_count} {bed_type} beds
                    </div>
                    <div>
                        {start_date ? `${moment(start_date).format('MM DD YY')} - ` : ''}
                        {end_date ? moment(end_date).format('MM DD YY') : ''}
                    </div>
                    <div>
                        Confirm booking
                    </div>
                </div>
            </div>
        );
    }
}