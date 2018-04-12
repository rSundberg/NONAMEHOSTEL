import React, { Component, Fragment } from 'react'
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

    bookings = null;

    dateRange = (start, end) => end ? 
        this.setState({start_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD')}) :
        this.setState({start_date: start.format('YYYY-MM-DD')}) ;


    currentLocation = (location) => this.setState({location: location})

    pickBed = (bedInfo = {}) => this.setState(bedInfo)
    
    customerDetails = (details) => this.setState(details)

    sendDetails = () => {
        this.bookings.add(this.state).then(ref => {
            this.setState({
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
                country: null,
                booked: true,
                visible: false
            })

            console.log(ref.id)
        })
    }

    componentDidUpdate() {
        if (this.state.location) {
            this.bookings = this.db.collection("locations").doc(this.state.location).collection('bookings');
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const {start_date, end_date, location, bed_type, bed_count, bed_alternative, room_count, name, email, phone, message, booked, visible} = this.state

        const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent)

        return (
            <Fragment>
                {
                    isMobile ?
                        <div className={'Booking__toggle-button'} onClick={() => this.toggleVisibility()}>
                            {visible ? 'Back home' : 'Book your stay'}
                        </div> :
                        null
                }
            <div className={`Scrollable ${isMobile ? 'Booking--mobile' : ''} ${visible ? 'Scrollable--visible' : ''}`}>
            <div className={`Booking`}>
                <h2 className={'Booking__title'}>
                    {
                        booked
                            ? 'Thank you for staying with us!'
                            : 'Stay with us!'
                    }
                </h2>

                {
                    !booked ?
                        <Calendar getDate={this.dateRange}/> :
                        null
                }

                {start_date && end_date ? <Locations getLocation={this.currentLocation}/> : null}

                {location ? <Beds getBed={this.pickBed} location={this.state.location} start_date={start_date} end_date={end_date}/> : null}
                
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
            </div>
            </Fragment>
        )
    }
}