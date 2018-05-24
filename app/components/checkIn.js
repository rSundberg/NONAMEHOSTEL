import React, { Component } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'

import Ticket from './ticket'

export default class CheckIn extends Component {
    state = {
        location: null,
        locations: [],
        pending: [],
        todays: []
    }

    componentDidMount() {
        this.getLocations()
    }
    
    db = firebase.firestore()
    
    bedsRef = () => this.db.collection('locations').doc(this.state.location).collection('beds')

    cancelBooking = booking => {
        console.log(booking.ref)
    }

    confirmBooking = booking => {
        console.log(booking.ref)
    }

    getLocations = () => this.db.collection('locations').get()
        .then(({docs}) => docs.map(({id}) => id))
        .then(locations => this.setState({locations: locations}, ))

    setLocation = location => this.setState({location: location}, () => {
        this.getPending()
        this.getTodays()
    })

    getTodays = () => {
        this.bedsRef().get()
            .then(({ docs }) =>
                docs.map(({ id }) =>
                    this.bedsRef().doc(id)
                        .collection('bookings')
                        .where('status', '==', 'booked')
                        .where('start_date', '==', moment().format('YYYY-MM-DD'))
                        .get()
            ))
            .then(bookings => Promise.all(bookings))
            .then(bookings => bookings.map(({ docs }) => docs))
            .then(bookings => bookings.reduce((flatArr, booking) => [...flatArr, ...booking], []))
            .then(bookings => this.setState({ todays: bookings }))
    }

    getPending = () => {
        this.bedsRef().get().then(({docs}) =>
            docs.map(({id}) =>
                this.bedsRef().doc(id)
                    .collection('bookings')
                    .where('status', '==', 'booked')
                    .where('start_date', '<', moment().format('YYYY-MM-DD'))
                    .get()
        ))
        .then(bookings => Promise.all(bookings))
        .then(bookings => bookings.map(({docs}) => docs))
        .then(bookings => bookings.reduce((flatArr, booking) => [...flatArr, ...booking], []))
        .then(bookings => bookings.reverse())
        .then(bookings => this.setState({pending: bookings}))
    }

    getItems = type => this.state[type].map(bed => {
        const {name} = bed.data()

        return (
            <div className={'CheckIn__list-item'}>
                {name}
            </div>
        )
    })
    
    render() {
        const {pending, todays, locations, location} = this.state

        return (
            <div className={'CheckIn'}>
                <div className={'CheckIn__content-box'}>
                    {!location
                        ? <h2 className={'CheckIn__title'}>Pick a location</h2>
                        : null
                    }

                    {locations.length
                        ? <div className={'CheckIn__locations'}>
                            {locations.map(location =>
                                <div onClick={() => this.setLocation(location)}>
                                    {location}
                                </div>
                            )}
                        </div>
                        : null
                    }
                </div>

                {location
                    ? <div className={'CheckIn__content-box'}>
                        <h2 className={'CheckIn__title'}>
                            Check in
                        </h2>

                        {!todays.length
                            ? 'All work is done!'
                            : todays.map((booking, i) => {
                            const { name, email, country, location, bed_count, room_count, start_date, end_date } = booking.data()

                            return <Ticket key={i}>
                                <div className={'Ticket__info'}>
                                    {name}
                                </div>

                                <div className={'Ticket__info'}>
                                    {location} - {bed_count} beds {room_count ? `, ${room_count} rooms` : ''}
                                </div>

                                <div className={'Ticket__info'}>
                                    {email}
                                </div>

                                <div className={'Ticket__info'}>
                                    {country}
                                </div>

                                <div className={'Ticket__info'}>
                                    {start_date} - {end_date}
                                </div>

                                <div className={'Ticket__action-button Ticket__action-button--confirm'} onClick={() => this.confirmBooking(booking)}>
                                    Confirm Booking
                                </div>
                            </Ticket>
                        })}
                    </div>
                    : null
                }

                {location
                    ? <div className={'CheckIn__content-box'}>
                        <h2 className={'CheckIn__title'}>
                            Pending
                        </h2>

                        {!pending.length
                            ? 'All work is done!'
                            : pending.map((booking, i) => {
                            const {name, email, country, bed_count, room_count, start_date, end_date} = booking.data()

                            return <Ticket key={i}>
                                <div className={'Ticket__info'}>
                                    {name}
                                </div>

                                <div className={'Tickets__info'}>
                                    {bed_count} beds {room_count ? `, ${room_count} rooms` : ''}
                                </div>

                                <div className={'Ticket__info'}>
                                    {email}
                                </div>

                                <div className={'Ticket__info'}>
                                    {country}
                                </div>

                                <div className={'Ticket__info'}>
                                    {start_date} - {end_date}
                                </div>

                                <div className={'Ticket__action-button Ticket__action-button--cancel'} onClick={() => this.cancelBooking(booking)}>
                                    Cancel booking
                                </div>
                            </Ticket>
                        })}
                    </div>
                    : null
                }
            </div>
        );
    }
}