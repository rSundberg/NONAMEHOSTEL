import React, { Component, Fragment } from 'react'
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

function Info({type, count, start, end, name, email}) {
    return (
        <div className={'Booking__info'}>
            <h2>Booking info</h2>
            
            {name && email
                ? <Fragment>
                    <div>
                        {name}
                    </div>

                    <div>
                        {email}
                    </div>
                </Fragment>
                : null
            }

            <div>
                {
                    type === 'tent' || type === 'camp'
                        ? `${count} ${type === 'camp'
                            ? `Camp ${count > 1
                                ? 'beds'
                                : 'bed'}`
                            : type === 'tent'
                                ? `Pitch your own ${count > 1
                                    ? 'tents'
                                    : 'tent'}`
                                : ''}`
                        : ''
                }
                {
                    type === 'dorm' ?
                        `${count} dorm ${count > 1 ? 'beds' : 'bed'}` :
                        ''
                }
                {
                    type === 'room' ?
                        `${count} ${count > 1 ? 'people' : 'person'} - ${count} ${count > 1 ? 'rooms' : 'room'}` :
                        ''
                }
            </div>

            <div>
                {start ? `${start} - ` : ''}
                {end ? end : ''}
            </div>
        </div>
    )
}

export default class Booking extends Component {
    state = {
        booking_date: this.props.moment().format('YYYY-MM-DD'),
        start_date: null,
        end_date: null,
        location: 'goa',
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

    toggleBedType = bed => this.setState(this.resetState({ activeBed: bed, bed_count: this.state.bed_count}))

    updateBedType = bed => this.setState({
        bed_type: bed,
        rooms_confirmed: false
    }, () => {
        const amount = this.state.room_count ? this.state.room_count : this.state.bed_count
        const query = `?location=${this.state.location}&bed_type=${this.state.bed_type}&requested_amount=${amount}`

        const url = `https://us-central1-nonamehostel-a5e96.cloudfunctions.net/blockedDates${query}`

        Promise.all(this.fetchAll([url])).then(dates => this.setState({
            blockedDates: dates.join(),
            rooms_confirmed: true
        }))
    })

    updateBedCount = count => count <= 10 ? this.setState({bed_count: count}) : null

    updateRoomCount = count => this.setState({room_count: count}, () => {
        this.updateBedType('room')
    })

    customerDetails = details => this.setState(details)

    backToBooking = () => this.setState(this.resetState({booked: false}))
    
    dateRange = (start, end) => end
        ? this.setState({start_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD')})
        : this.setState({start_date: start.format('YYYY-MM-DD')});

    resetState = (mergeObj = {}) => {
        let state = {
            activeBed: null,
            booking_date: this.props.moment().format('YYYY-MM-DD'),
            start_date: null,
            end_date: null,
            location: 'goa',
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
                .then(() => {
                    this.setState({booked: true, booking: false}, () => {
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

    render() {
        const {start_date, end_date, location, bed_type, bed_count, room_count, name, email, phone, message, booked, booking, rooms_confirmed, activeBed, limit, docs} = this.state
        const {moment} = this.props

        return (
            <Fragment>
                {!booked ?
                    <div className={`Booking`} ref={this.bookingContainer}>
                        <h2 className={'Booking__title'}>
                            Stay with us!
                        </h2>

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

                        { bed_type
                            ? !rooms_confirmed
                                ? <div className={'Booking__loader'}>Checking availability</div>
                                : <Calendar
                                    getDate={this.dateRange}
                                    blockedDays={this.state.blockedDates}
                                />
                            : null
                        }

                        { bed_type && bed_count && start_date && end_date
                            ? <Details getDetails={this.customerDetails}/>
                            : null
                        }

                        {
                            bed_type && bed_count && start_date && end_date
                                ? <Info
                                    type={bed_type}
                                    count={room_count ? room_count : bed_count}
                                    start={start_date}
                                    end={end_date}
                                />
                                : null
                        }

                        { bed_type && start_date && end_date && name && email && phone && message
                            ? !booking
                                ? <span className={`Booking__confirm`} onClick={() => this.sendBooking()}>
                                        Confirm booking
                                </span>
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

                        <div className={'Booking__donation-info'}>
                            <h2>One more step before we confirm your booking...</h2>

                            <p>
                                In order to confirm your booking you need to
                                become a initiator on our crowdfunding page.
                            </p>

                            <p>
                                Follow the link, donate and we will send you a confirmation email
                                asap.
                            </p>

                            <p>
                                Check your email for more details.
                            </p>

                            <a href={'https://www.gofundme.com/nonamehostel'}>No Name gofundme page</a>
                        </div>

                        <Info
                            type={bed_type}
                            count={room_count ? room_count : bed_count}
                            start={start_date}
                            end={end_date}
                            name={name}
                            email={email}
                        />

                        <div className={'Booking__back'} onClick={() => this.backToBooking()}>
                            Book more beds
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}