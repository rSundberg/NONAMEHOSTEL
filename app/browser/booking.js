import React, { Component, Fragment } from 'react'
import anime from 'animejs'
import fetch from 'isomorphic-fetch'

import { getDateRange } from '../shared/utils'

import '../shared/css/booking.css'

import Calendar from './calendar'
import Beds from './beds'
import Details from './details'
import Counter from './counter'

import CampStay from '../shared/media/camp_bed_stay.svg'
import FreeStay from '../shared/media/free_stay.svg'

function PriceTag({type, beds = 0, rooms = 0, days = 0}) {
    return (
        <div className={'Booking__pricetag'}>
            <h2>Total Price:</h2>

            { type === 'camp' || type === 'tent'
                ? 'Free of charge!'
                : null
            }

            { type === 'dorm'
                ? `${(beds * 200) * days} rps`
                : null
            }

            { type === 'room'
                ? 'Please contact us for more information'
                : null
            }
            {/* type === 'room'
                ? beds > rooms ? `${((rooms * 700) + ((beds - (rooms * 2)) * 200) * days)} rps` : `${((rooms * 700) * days)} rps`
                : null
            */}
        </div>
    )
}

function Info({type, bedCount, roomCount, start, end, name, email}) {
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
                        ? `${bedCount} ${type === 'camp'
                            ? `Camp ${bedCount > 1
                                ? 'beds'
                                : 'bed'}`
                            : type === 'tent'
                                ? `Pitch your own ${bedCount > 1
                                    ? 'tents'
                                    : 'tent'}`
                                : ''}`
                        : ''
                }
                {
                    type === 'dorm' ?
                        `${bedCount} dorm ${bedCount > 1 ? 'beds' : 'bed'}` :
                        ''
                }
                {
                    type === 'room' ?
                        `${bedCount} ${bedCount > 1 ? 'people' : 'person'} - ${roomCount} ${roomCount > 1 ? 'rooms' : 'room'}` :
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
        status: 'booked',
        isMember: false,
        detailsConfirmed: false
    }
    
    bookingContainer = React.createRef()

    componentDidMount() {
        anime({
            targets: this.bookingContainer.current,
            duration: 650,
            easing: 'easeInOutQuart',
            scaleX: this.props.isMobile ? 1 : [{ value: -1, duration: 0 }],
            opacity: [0, 1]
        })
    }

    toggleBedType = bed => this.setState(this.resetState({ activeBed: bed, bed_count: this.state.bed_count}))

    updateBedType = bed => this.setState({
        bed_type: bed,
        rooms_confirmed: false
    }, () => {
        const amount = this.state.room_count ? this.state.room_count : this.state.bed_count
        const query = `?location=${this.state.location}&bed_type=${this.state.bed_type}&requested_amount=${amount}`

        const url = `https://us-central1-nonamehostel-a5e96.cloudfunctions.net/blockedDates${query}`

        Promise.all(this.fetchAll([url])).then(dates => {
            this.setState({
                blockedDates: dates.join(),
                rooms_confirmed: true
            })
        })
        .catch(err => this.setState({
            bed_type: null,
            activeBed: null,
            rooms_confirmed: false
        }))
    })

    updateBedCount = count => count <= 10 ? this.setState(this.resetState({bed_count: count})) : null

    updateRoomCount = count => this.setState({room_count: count}, () => {
        this.updateBedType('room')
    })

    customerDetails = details => this.setState({...details, ...{detailsConfirmed: true}}, () => {
        anime({
            targets: 'html, body',
            scrollTop: 0,
            duration: 350,
            easing: 'easeOutQuart'
        })
    })

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
            status: 'booked',
            isMember: false,
            detailsConfirmed: false
        }

        return {
            ...state,
            ...mergeObj
        }
    }

    bookingInfo = ['start_date', 'end_date', 'booking_date', 'location', 'bed_count', 'bed_type', 'room_count', 'status']

    bookingDetails = ['name', 'email', 'message', 'phone', 'country', 'isMember']

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
            Promise.all(_this.fetchAll([url]))
                .then(() =>
                    this.setState({ booked: true, booking: false }, () =>
                        anime({
                            targets: "html, body",
                            scrollTop: [window.scrollY, 0],
                            easing: 'easeInQuart',
                            duration: window.scrollY > 0 ? 550 : 0
                        })
                    ))
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
        const {start_date, end_date, location, bed_type, bed_count, room_count, name, email, phone, message, booked, booking, rooms_confirmed, activeBed, detailsConfirmed, isMember} = this.state
        const {moment} = this.props

        return (
            <div className={'Booking'} ref={this.bookingContainer}>
                {!booked
                    ? <Fragment>
                        {!detailsConfirmed
                            ? <Fragment>
                                <h2 className={'Booking__title'}>
                                    Stay with us!
                                </h2>

                                <Counter
                                    title={'How many people are you booking for?'}
                                    count={bed_count}
                                    updateCount={this.updateBedCount}
                                />

                                <Beds
                                    toggleBed={this.toggleBedType}
                                    addBed={this.updateBedType}
                                    activeBed={activeBed}
                                />

                                {activeBed === 'free'
                                    ? <div className={'Booking__info'}>
                                        <h2>Free</h2>

                                        <div>
                                            Tent in our campsite and shared bathroom in exchange for one daily help.
                                        </div>

                                        <h2>Camp Beds</h2>

                                        <div>
                                            Space & bedding in a shared tent.
                                        </div>

                                        <h2>Pitch your tent</h2>

                                        <div>
                                            Tent spot in our campsite
                                            (rent bedding for 100 rupees per night).
                                        </div>
                                    </div>
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

                                {activeBed === 'dorm'
                                    ? <div className={'Booking__info'}>
                                        <h2>Dorm</h2>

                                        <div>
                                            Single and Double bunk beds in 8 people dormitory.
                                            Members pay 200 rupees per night.
                                        </div>
                                    </div>
                                    : null
                                }

                                {activeBed === 'room'
                                    ? <div className={'Booking__info'}>
                                        <h2>Room</h2>

                                        <div>
                                            Double bedroom with bathroom and balcony.
                                        </div>
                                    </div>
                                    : null
                                }

                                {activeBed === 'room'
                                    ? <Counter limit={bed_count} showAll={true} title={'Number of rooms?'} count={room_count} updateCount={this.updateRoomCount} />
                                    : null
                                }

                                {bed_type
                                    ? !rooms_confirmed
                                        ? <div className={'Booking__loader'}>Checking availability</div>
                                        : <Calendar
                                            getDate={this.dateRange}
                                            blockedDays={this.state.blockedDates}
                                        />
                                    : null
                                }

                                {bed_type && bed_count && start_date && end_date
                                    ? <Details getDetails={this.customerDetails} />
                                    : null
                                }
                            </Fragment>
                            : <Fragment>
                                {bed_type && start_date && end_date && name && email && phone && message
                                    ? <Info
                                        name={name}
                                        email={email}
                                        type={bed_type}
                                        bedCount={bed_count}
                                        roomCount={room_count}
                                        start={start_date}
                                        end={end_date}
                                    />
                                    : null
                                }

                                <PriceTag
                                    type={bed_type}
                                    beds={bed_count}
                                    rooms={room_count}
                                    days={moment(end_date).diff(start_date, 'days')}
                                />

                                {bed_type && start_date && end_date && name && email && phone && message
                                    ? !booking
                                        ? <span className={`Booking__confirm`} onClick={() => this.sendBooking()}>
                                            Confirm booking
                                        </span>
                                        : <div className={'Booking__loader'}>
                                            Confirming your stay
                                        </div>
                                    : null
                                }
                            </Fragment>
                        }
                    </Fragment>
                    : <Fragment>
                        <h2 className={'Booking__title'}>
                            Thank you for your request
                        </h2>

                        {!isMember
                            ? <div className={'Booking__donation-info'}>
                                <h2>To stay with us you need to be a home collective member.</h2>

                                <p>
                                    Please contribute a minimum of {bed_count * 15} euros
                                    on our crowdfunding to initiate your membership and confirm the booking.
                                </p>

                                <div className={'Booking__donation-button'}>
                                    <a href={'https://www.gofundme.com/nonamehostel/donate'}>Donate now</a>
                                </div>
                            </div>
                            : null
                        }

                        <Info
                            type={bed_type}
                            bedCount={bed_count}
                            roomCount={room_count}
                            start={start_date}
                            end={end_date}
                            name={name}
                            email={email}
                        />

                        <div className={'Booking__back'} onClick={() => this.backToBooking()}>
                            Book more beds
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}    