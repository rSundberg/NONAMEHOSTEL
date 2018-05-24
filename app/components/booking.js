import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'
import localforage from 'localforage'
import anime from 'animejs'

import { getDateRange } from '../utils/utils'

import Calendar from './calendar'
import Locations from './locations'
import Beds from './beds'
import Details from './details'
import Counter from './counter'
import beds from './beds';

import CampStay from '../camp_bed_stay.svg'
import FreeStay from '../free_stay.svg'

export default class Booking extends Component {
    state = {
        booking_date: moment().format('YYYY-MM-DD'),
        start_date: null,
        end_date: null,
        location: null,
        bed_type: null,
        bed_count: 1,
        room_count: null,
        name: null,
        email: null,
        phone: null,
        message: null,
        country: null,
        rooms_confirmed: false,
        camp: [],
        tent: [],
        dorm: [],
        room: [],
        booked: false,
        booking: false,
        status: 'booked'
    }

    db = firebase.firestore()

    currentLocation = location => this.setState(this.resetState({location: location}))

    toggleBedType = bed => this.state.location ? this.setState({activeBed: bed}) : null

    updateBedType = bed => this.state.location
        ? this.setState({
                bed_type: bed,
                room_count: null
            }, this.getLocationData)
        : null

    updateBedCount = count => this.setState({bed_count: count})

    updateRoomCount = count => this.setState({room_count: count})

    customerDetails = details => this.setState(details)

    backToBooking = () => this.setState({booked: false})
    
    dateRange = (start, end) => end
        ? this.setState({start_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD')})
        : this.setState({start_date: start.format('YYYY-MM-DD')});

    resetState = (mergeObj = {}) => {
        let state = {
            activeBed: null,
            booking_date: moment().format('YYYY-MM-DD'),
            start_date: null,
            end_date: null,
            location: null,
            bed_type: null,
            bed_count: 1,
            room_count: null,
            name: null,
            email: null,
            phone: null,
            message: null,
            country: null,
            rooms_confirmed: false,
            tent: [],
            camp: [],
            dorm: [],
            room: [],
            booked: false,
            booking: false,
            status: 'booked'
        }

        return {
            ...state,
            ...mergeObj
        }
    }

    bookingInfo = ['start_date', 'end_date', 'booking_date', 'location', 'bed_count', 'bed_type', 'room_count', 'status']

    bookingDetails = ['name', 'email', 'message', 'phone', 'country']

    filterObj = (obj = {}, allowed = []) => Object
        .keys(obj)
        .filter(key => allowed.includes(key))
        .reduce((acc, key) => {
            return {
                ...acc,
                [key]: this.state[key]
            }
        }, {})

    sendBooking = () => {
        this.setState({booking: true}, () => {
            localforage
            .setItem('bookingDetails', this.filterObj(this.state, this.bookingDetails))
            .then(val => {
                this.db
                    .collection("locations")
                    .doc(this.state.location)
                    .collection('beds')
                    .doc(this.state.bed_type)
                    .collection('bookings')
                    .add(this.filterObj(this.state, [...this.bookingInfo, ...this.bookingDetails]))
                    .then(ref => {
                        this.setState(this.resetState({booked: true, booking: false}))

                        anime({
                            targets: "html, body",
                            scrollTop: [window.scrollY, 0],
                            easing: 'easeInQuart',
                            duration: window.scrollY > 0 ? 550 : 0
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
    }

    getLocationData = () => {
        if (this.state[this.state.bed_type].length > 0) return

        this.setState({rooms_confirmed: false}, () => {
            this.db
                .collection("locations")
                .doc(this.state.location)
                .collection('beds')
                .doc(this.state.bed_type)
                .collection('bookings')
                .get().then(doc => {
                    if (!doc.empty) {
                        this.setState({
                            rooms_confirmed: true,
                            [this.state.bed_type]: doc.docs
                        })
                    } else {
                        this.setState({rooms_confirmed: true})
                        console.log('empty')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    blockedDateByLimit = (data, limit) => {
        const bookingsPerDate = data.reduce((obj, val) => {
            const {start_date, end_date, bed_count, room_count} = val.data()
            const dateArr = getDateRange(moment(start_date), moment(end_date), 'YYYY-MM-DD')
            const amountPerDay = dateArr.reduce((dateObj, date) => {
                const amount = room_count
                    ? obj[date]
                        ? obj[date] + room_count
                        : room_count
                    : obj[date]
                        ? obj[date] + bed_count
                        : bed_count

                return {
                    ...dateObj,
                    ...{
                        [date]: amount
                    }
                }
            }, {})

            return {
                ...obj,
                ...amountPerDay
            }
        }, {})

        const filteredDates = Object.keys(bookingsPerDate).filter(key => bookingsPerDate[key] >= limit)

        return filteredDates
    }

    bedLimit = () => {
        this.db.collection
    }

    render() {
        const {start_date, end_date, location, bed_type, bed_count, room_count, name, email, phone, message, booked, booking, rooms_confirmed, activeBed} = this.state

        const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent)

        return (
            <Fragment>
                {!booked ?
                    <div className={`Booking`}>
                        <h2 className={'Booking__title'}>
                            Stay with us!
                        </h2>

                        <Locations
                            getLocation={this.currentLocation}
                            currentLocation={location}
                            />

                        <Counter title={'How many people are you booking for?'} count={bed_count} updateCount={this.updateBedCount}/>

                        <Beds
                            toggleBed={this.toggleBedType}
                            addBed={this.updateBedType}
                            activeBed={activeBed}
                            />

                        {activeBed === 'room'
                            ? <Counter limit={8} showAll={true} title={'Number of rooms?'} count={room_count} updateCount={this.updateRoomCount} />
                            : null
                        }

                        {activeBed === 'free'
                            ? <div className={'Beds__alternatives'}>
                                <div
                                    className={`Beds__card ${bed_type === 'camp' ? 'Beds__card--active' : ''}`}
                                    onClick={() => this.updateBedType('camp')}>
                                    <CampStay />
                                    Camp beds
                                </div>

                                <div
                                    className={`Beds__card ${bed_type === 'tent' ? 'Beds__card--active' : ''}`}
                                    onClick={() => this.updateBedType('tent')}>
                                    <FreeStay />
                                    Pitch your tent
                                </div>
                            </div>
                            : null
                        }

                        { location && bed_type && bed_type !== 'room' || room_count
                            ? rooms_confirmed
                                    ? <Calendar getDate={this.dateRange} blockedDays={this.blockedDateByLimit(this.state[bed_type], 4)}/>
                            : <div className={'Booking__loader'}>Checking availability</div>
                            : null
                        }

                        { start_date && end_date
                            ? <Details getDetails={this.customerDetails}/>
                            : null
                        }

                        { start_date && end_date && name && email && phone && message
                            ? !booking
                                ? <div className={`Booking__confirm`} onClick={() => this.sendBooking()}>
                                    <div>
                                        {`${location} - `}
                                        {
                                            bed_type === 'tent' || bed_type === 'camp'
                                                ? `${bed_count} ${bed_type === 'camp'
                                                    ? `Camp ${bed_count > 1
                                                        ? 'beds'
                                                        : 'bed'}`
                                                    : bed_type === 'tent'
                                                        ? `Pitch your own ${bed_count > 1
                                                            ? 'tents'
                                                            : 'tent'}`
                                                        : ''}`
                                                : ''
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
                                </div>
                                : <div className={'Booking__loader'}>
                                        Confirming your stay
                                </div>
                            : null
                        }
                    </div> :
                    <div className={'Booking'}>
                        <h2 className={'Booking__title'}>
                            Thanks for staying with us!
                        </h2>
                        <div className={'Booking__back'} onClick={() => this.backToBooking()}>
                            Book more beds
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}