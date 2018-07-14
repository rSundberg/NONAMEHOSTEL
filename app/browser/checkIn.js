import React, { Component, Fragment } from 'react'

import Tickets from './tickets'
import Locations from './locations'

export default class CheckIn extends Component {
    state = {
        location: null,
        locations: [],
        pending: [],
        todays: []
    }

    componentDidMount() {
        this.setLocation('goa')
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

    confirmBooking = booking => this.updateBookingStatus(booking, 'hosted')
        .then(() => this.setState({
            todays: this.state.todays.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path)
        }))
        .catch(err => console.log(err))

    setLocation = location => this.setState({location: location, loading: true}, () => {
        this.getPending()
        this.getTodays()
    })

    getTodays = () => {
        this.bedsRef().get()
            .then(({ docs }) =>
                docs.map(({ id }) =>
                    this.bedsRef().doc(id)
                        .collection('bookings')
                        .where('status', '==', 'confirmed')
                        .where('start_date', '==', this.props.moment().format('YYYY-MM-DD'))
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
                    .where('status', '==', 'confirmed')
                    .where('start_date', '<', this.props.moment().format('YYYY-MM-DD'))
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
                <Locations
                    onClick={this.setLocation}
                    currentLocation={location}
                />

                {!location ||
                    <Fragment>
                        <Tickets
                            title={'Check in'}
                            data={todays}
                            ticketAction={this.confirmBooking}
                        />

                        <Tickets
                            title={'Pending'}
                            data={pending}
                            onConfirmClick={this.confirmBooking}
                            onCancelClick={this.cancelBooking}
                        />
                    </Fragment>
                }
            </div>
        );
    }
}