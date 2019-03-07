import React, { Component, Fragment } from 'react'

import Tickets from './tickets'
import Locations from './locations'
import Loader from './loader'

export default class CheckIn extends Component {
    state = {
        location: null,
        locations: [],
        pending: [],
        todays: [],
        tomorrow: [],
        loadingTodays: false,
        loadingPending: false,
        ticketsLoading: []
    }

    componentDidMount() {
        this.setLocation('goa')
    }

    bedsRef = () => this.props.firestore
        .collection('locations')
        .doc(this.state.location)
        .collection('beds')

    updateBookingStatus = (booking, status) => {
        this.setState(({ ticketsLoading }) => {
            ticketsLoading.push(booking.id)

            return {
                ticketsLoading: ticketsLoading
            }
        })

        return this.props.firestore.doc(booking.ref.path).update({ status: status })
    }

    cancelBooking = booking => this.updateBookingStatus(booking, 'canceled')
        .then(() => this.setState(({ todays, pending, ticketsLoading }) => ({
            todays: todays.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path),
            pending: pending.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path),
            ticketsLoading: ticketsLoading.filter(id => id === booking.id)
        })))
        .catch(err => console.log(err))

    confirmBooking = booking => this.updateBookingStatus(booking, 'hosted')
        .then(() => this.setState(({ todays, pending, ticketsLoading }) => ({
            todays: todays.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path),
            pending: pending.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path),
            ticketsLoading: ticketsLoading.filter(id => id === booking.id)
        })))
        .catch(err => console.log(err))

    setLocation = location => this.setState({location: location, loading: true}, () => {
        this.getPending()
        this.getTodays()
        this.getTomorrow()
    })

    getConfirmedBookings = day => this.bedsRef().get()
        .then(({ docs }) =>
            docs.map(({ id }) =>
                this.bedsRef().doc(id)
                    .collection('bookings')
                    .where('status', '==', 'confirmed')
                    .where('start_date', '==', day)
                    .get()
        ))
        .then(bookings => Promise.all(bookings))
        .then(bookings => bookings.map(({ docs }) => docs).reduce((flatArr, booking) => [...flatArr, ...booking], []))
        .catch(err => console.log(err))

    getTodays = () => {
        this.setState({loadingTodays: true, todays: []})

        this.getConfirmedBookings(this.props.moment().format('YYYY-MM-DD'))
            .then(bookings => this.setState({ todays: bookings, loadingTodays: false }))
    }

    getTomorrow = () => {
        this.setState({ loadingTomorrow: true, tomorrow: [] })

        this.getConfirmedBookings(this.props.moment().add(1, 'days').format('YYYY-MM-DD'))
            .then(bookings => this.setState({ tomorrow: bookings, loadingTomorrow: false }))
    }


    getPending = () => {
        this.setState({ loadingPending: true, pending: []})

        this.bedsRef().get()
            .then(({docs}) =>
                docs.map(({id}) =>
                    this.bedsRef().doc(id)
                        .collection('bookings')
                        .where('status', '==', 'confirmed')
                        .where('start_date', '<', this.props.moment().format('YYYY-MM-DD'))
                        .get()
            ))
            .then(bookings => Promise.all(bookings))
            .then(bookings => bookings.map(({docs}) => docs).reduce((flatArr, booking) => [...flatArr, ...booking], []).reverse())
            .then(bookings => this.setState({pending: bookings, loadingPending: false}))
            .catch(err => console.log(err))
    }
    
    render() {
        const { pending, todays, tomorrow, loadingTodays, loadingTomorrow, loadingPending, ticketsLoading } = this.state

        return (
            <div className={'CheckIn'}>
                <Tickets
                    title={'Today'}
                    data={todays}
                    onConfirmClick={this.confirmBooking}
                    onCancelClick={this.cancelBooking}
                    reload={this.getTodays}
                    loading={ticketsLoading}
                    moment={this.props.moment}
                />

                { loadingTodays
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }

                <Tickets
                    title={'Tomorrow'}
                    data={tomorrow}
                    onCancelClick={this.cancelBooking}
                    reload={this.getTomorrow}
                    loading={ticketsLoading}
                    moment={this.props.moment}
                />

                { loadingTomorrow
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }

                <Tickets
                    title={'Pending'}
                    data={pending}
                    onConfirmClick={this.confirmBooking}
                    onCancelClick={this.cancelBooking}
                    reload={this.getPending}
                    loading={ticketsLoading}
                    moment={this.props.moment}
                />

                { loadingPending
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }
            </div>
        );
    }
}