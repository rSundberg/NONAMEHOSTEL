import React, { Component } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'

import Calendar from './calendar'
import Locations from './locations'
import Beds from './beds'
import Details from './details'

export default class Booking extends Component {
    state = {
        booking_date: moment().format('YYYY-MM-DD'),
        start_date: null,
        end_date: null,
        location: null,
        bed_type: null,
        bed_count: null,
        bed_alternative: null,
        name: null,
        email: null,
        phone: null,
        message: null,
        country: null
    }

    db = firebase.firestore();

    bookings = this.db.collection("locations").doc("goa").collection('bookings');

    dateRange = (start, end) => end ? 
        this.setState({start_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD')}) :
        this.setState({start_date: start.format('YYYY-MM-DD')}) ;


    currentLocation = (location) => this.setState({location: location})

    pickBed = (bedInfo = {}) => this.setState(bedInfo)
    
    customerDetails = (details) => this.setState(details)

    sendDetails = () => {
        this.bookings.add(this.state).then(ref => console.log(ref.id))
    }

    componentDidMount = () => {
        this.bookings
            .where("location", "==", "goa")
            .where("start_date", ">", "2018-04-10")
            .get().then(query => {
                query.forEach(doc => {
                    console.log(doc.data())
                })
            })
    }

    render() {
        const {start_date, end_date, location, bed_type, bed_count, bed_alternative, room_count, name, email, phone, message} = this.state

        return (
            <div className={'Booking'}>
                <h2 className={'Booking__title'}>
                    Stay with us!
                </h2>

                <Calendar getDate={this.dateRange}/>

                {start_date && end_date ? <Locations getLocation={this.currentLocation}/> : null}

                {location ? <Beds getBed={this.pickBed}/> : null}
                
                {bed_type ? <Details getDetails={this.customerDetails}/> : null}

                {name && email && phone && message ?
                    <div className={`Booking__confirm`} onClick={() => this.sendDetails()}>
                        <div>
                            {
                                `${location} - `
                            }
                            {
                                bed_type === 'free' ?
                                    `${bed_count} ${bed_alternative === 'campbed' ?
                                    `Camp ${bed_count > 1 ? 'beds' : 'bed'}` :
                                    bed_alternative === 'tent' ?
                                    `Pitch your own ${bed_count > 1 ?
                                    'tents' : 'tent'}` : ''}` : ''
                            }
                            {
                                bed_type === 'dorm' ?
                                    `${bed_count} dorm ${bed_count > 1 ? 'beds' : 'bed'}` :
                                    ''
                            }
                            {
                                bed_type === 'room' ?
                                    `${bed_count} ${bed_count > 1 ? 'people' : 'person'} - ${room_count} ${room_count > 1 ? 'rooms' : 'room'}` :
                                    ''
                            }
                        </div>
                        <div>
                            {start_date ? `${moment(start_date).format('DD-MM-YY')} - ` : ''}
                            {end_date ? moment(end_date).format('DD-MM-YY') : ''}
                        </div>
                        <div>
                            Confirm booking
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}