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
        country: null,
        rooms_confirmed: false
    }

    db = firebase.firestore();

    bookings = null;

    dateRange = (start, end) => end ? 
        this.setState({start_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD')}) :
        this.setState({start_date: start.format('YYYY-MM-DD')}) ;


    currentLocation = location => this.setState({location: location}, this.updateBedAvailability)

    pickBed = (bedInfo = {}) => this.setState(bedInfo)
    
    customerDetails = (details) => this.setState(details)

    sendDetails = () => {
        const allowed = ['start_date', 'end_date', 'booking_date', 'location', 'bed_count', 'bed_type', 'bed_alternative', 'name', 'email', 'message', 'phone']

        const filtered = Object
            .keys(this.state)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: this.state[key]
                };
            }, {});


        this.db
            .collection("locations")
            .doc(this.state.location)
            .collection('bookings')
            .add(filtered)
            .then(ref => {
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

    getDateRange = (startDate, endDate, dateFormat) => {
        let dates = [],
            end = moment(endDate),
            diff = endDate.diff(startDate, 'days');

        if (!startDate.isValid() || !endDate.isValid() || diff <= 0) {
            return;
        }

        for (let i = 0; i < diff; i++) {
            dates.push(end.subtract(1, 'd').format(dateFormat));
        }

        return dates;
    }

    isAvailable = (data, type) => {

        if (!data) {
            return
        }

        let bedType = data
            .map(bed => bed.data())
            .filter(bed => bed.bed_type === type)

        let selectedDates = this.getDateRange(moment(this.state.start_date), moment(this.state.end_date), 'YYYY-MM-DD').reverse()

        let bedsPerDay = selectedDates.map(date => bedType.reduce((sum, bed) => moment(date).isBetween(bed.start_date, bed.end_date)
            ? sum + bed.bed_count
            : sum, 0))

        if (bedsPerDay.some(amount => amount >= 20)) {
            return false
        } else {
            return true
        }
    }

    updateBedAvailability() {
        if (this.state[this.state.location]) {
            return
        } else {
            this.setState({rooms_confirmed: false}, () => {
                this.db
                .collection("locations")
                .doc(this.state.location)
                .collection('bookings')
                .where("end_date", ">", this.state.start_date)
                .get().then(doc => {
                    if (!doc.empty) {
                        this.setState({
                            rooms_confirmed: true,
                            [this.state.location]: doc.docs
                        })
    
                    } else {
                        // this.setState({rooms_confirmed: false})
                    }
    
                })
                .catch(err => {
                    console.log(err)
                })
            })
                
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const {start_date, end_date, location, bed_type, bed_count, bed_alternative, room_count, name, email, phone, message, booked, visible, rooms_confirmed} = this.state

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

                    {
                        location ?
                            rooms_confirmed ?
                                <Beds getBed={this.pickBed} beds={this.state[this.state.location]} isAvailable={this.isAvailable}/> :
                                <div className={'Beds'}>
                                    <div className={'Beds__loader'}>
                                        Checking availability...
                                    </div>
                                </div>
                            : null
                    }
                    
                    {
                        bed_type
                            ? <Details getDetails={this.customerDetails}/>
                            : null
                    }

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