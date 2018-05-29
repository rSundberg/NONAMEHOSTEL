import React, { Component, Fragment } from 'react'
import moment from 'moment'
import anime from 'animejs'
import fetch from 'isomorphic-fetch'

import { getDateRange } from '../shared/utils'

import '../shared/css/booking.css'

import Calendar from './calendar'
import Locations from './locations'
import Beds from './beds'
import Details from './details'
import Counter from './counter'

import CampStay from '../shared/media/camp_bed_stay.svg'
import FreeStay from '../shared/media/free_stay.svg'

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
        blockedDates: [],
        limit: null,
        booked: false,
        booking: false,
        status: 'booked'
    }

    bookingContainer = React.createRef()

    componentDidMount() {
        if (!this.props.isMobile) {
            anime({
                targets: this.bookingContainer.current,
                duration: 650,
                easing: 'easeInOutQuart',
                width: ['0vw', '32vw']
            })
        }
    }

    currentLocation = location => this.setState(this.resetState({location: location}))

    toggleBedType = bed => this.state.location ? this.setState({ activeBed: bed, bed_type: null}) : null

    updateBedType = bed => this.state.location
        ? this.setState({
                bed_type: bed,
                room_count: null,
                rooms_confirmed: false
            }, () => {
                const query = `?location=${this.state.location}&bed_type=${this.state.bed_type}`
                const locationUrl = `https://us-central1-nonamehostel-a5e96.cloudfunctions.net/locationData${query}`
                const bedUrl = `https://us-central1-nonamehostel-a5e96.cloudfunctions.net/bedLimit${query}`

                this.blockedDates([locationUrl, bedUrl]).then(dates => this.setState({blockedDates: dates, rooms_confirmed: true}))
            })
        : null

    updateBedCount = count => count <= 10 ? this.setState({bed_count: count}) : null

    updateRoomCount = count => this.setState({room_count: count}, () => {
        this.updateBedType('room')
    })

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
            docs: [],
            limit: null,
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
        let bookingInfo = this.filterObj(this.state, [...this.bookingInfo, ...this.bookingDetails])
        let query = `?bookingInfo=${JSON.stringify(bookingInfo)}&location=${this.state.location}&bed_type=${this.state.bed_type}`
        let url = `https://us-central1-nonamehostel-a5e96.cloudfunctions.net/addBooking${query}`
        let _this = this

        this.setState({booking: true}, () => {
            this.props.localforage
                .setItem('bookingDetails', this.filterObj(this.state, this.bookingDetails))
                .then(() => Promise.all(_this.fetchAll([url])))
                .then(val => {
                    console.log(val)
                    this.setState(this.resetState({booked: true, booking: false}), () => {
                        anime({
                            targets: "html, body",
                            scrollTop: [window.scrollY, 0],
                            easing: 'easeInQuart',
                            duration: window.scrollY > 0 ? 550 : 0
                        })
                    })
                })
                .catch(err => console.log(err))
        })
    }

    blockedDateByLimit = ({docs, limit}) => {
        const bookingsPerDate = docs.reduce((obj, { start_date, end_date, bed_count, room_count }) => {
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

        const filteredDates = Object.keys(bookingsPerDate).filter(key => bookingsPerDate[key] >= limit - (this.state.room_count ? this.state.room_count : this.state.bed_count))

        return filteredDates
    }

    fetchAll = urls => urls.map(url =>
        fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    )

    blockedDates = urls => Promise.all(this.fetchAll(urls))
        .then(data => data.reduce(Object.assign), {})
        .then(this.blockedDateByLimit)

    render() {
        const {start_date, end_date, location, bed_type, bed_count, room_count, name, email, phone, message, booked, booking, rooms_confirmed, activeBed, limit, docs} = this.state

        return (
            <Fragment>
                {!booked ?
                    <div className={`Booking`} ref={this.bookingContainer}>
                        <h2 className={'Booking__title'}>
                            Stay with us!
                        </h2>

                        <Locations
                            onClick={this.currentLocation}
                            currentLocation={location}
                            />

                        <Counter title={'How many people are you booking for?'} count={bed_count} updateCount={this.updateBedCount}/>

                        <Beds
                            toggleBed={this.toggleBedType}
                            addBed={this.updateBedType}
                            activeBed={activeBed}
                            />

                        {activeBed === 'room'
                            ? <Counter limit={bed_count} showAll={true} title={'Number of rooms?'} count={room_count} updateCount={this.updateRoomCount} />
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

                        { location && bed_type
                            ? !rooms_confirmed
                                ? <div className={'Booking__loader'}>Checking availability</div>
                                : <Calendar
                                    getDate={this.dateRange}
                                    blockedDays={this.state.blockedDates}
                                />
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