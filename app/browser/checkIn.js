import React, { Component, Fragment } from 'react'
import moment from 'moment'

import Tickets from './tickets'
import Locations from './locations'

export default class CheckIn extends Component {
    state = {
        location: null,
        locations: [],
        pending: [],
        todays: []
    }

    bedsRef = () => this.props.firestore
        .collection('locations')
        .doc(this.state.location)
        .collection('beds')

    updateBookingStatus = (booking, status) => this.props.firestore.doc(booking.ref.path).update({ status: status })

    cancelBooking = booking => this.updateBookingStatus(booking, 'canceled')
        .then(() => this.setState({
            pending: this.state.pending.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path)
        }))
        .catch(err => console.log(err))

    confirmBooking = booking => this.updateBookingStatus(booking, 'canceled')
        .then(() => this.setState({
            todays: this.state.todays.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path)
        }))
        .catch(err => console.log(err))

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
            .catch(err => console.log(err))
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
        .catch(err => console.log(err))
    }
    
    render() {
        const {pending, todays, locations, location} = this.state

        return (
            <div className={'CheckIn'}>
                <div className={'CheckIn__content-box'}>
                    {!location
                        ? <h2 className={'CheckIn__title'}>Pick a location</h2>
                        : null
                    }

                    <Locations
                        onClick={this.setLocation}
                        currentLocation={location}
                    />
                </div>

                {!location ||
                    <Fragment>
                        <div className={'CheckIn__content-box'}>
                            <Tickets
                                title={'Check in'}
                                data={todays}
                                ticketAction={this.confirmBooking}
                                actionClass={'Ticket__action-button--confirm'}
                            />
                        </div>

                        <div className={'CheckIn__content-box'}>
                            <Tickets
                                title={'Pending'}
                                data={pending}
                                ticketAction={this.cancelBooking}
                                actionClass={'Ticket__action-button--cancel'}
                            />
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}