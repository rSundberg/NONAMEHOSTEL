import React, { Component } from 'react'

import '../shared/css/bookings.css'

import Tickets from './tickets'
import Categories from './categories'
import Loader from './loader'

import SearchIcon from '../shared/media/search.svg'

export default class Bookings extends Component {
    state = {
        location: 'goa',
        recent: [],
        email: null,
        start_date: null,
        end_date: null,
        filters: ['booked', 'confirmed', 'hosted', 'canceled'],
        activeFilter: null,
        searchResults: null,
        searchToggled: null,
        searchLoading: false,
        recentLoading: false
    }

    componentDidMount() {
        this.getRecentBookings()
    }

    bedsRef = () => this.props.firestore
        .collection('locations')
        .doc(this.state.location)
        .collection('beds')

    getRecentBookings = () => {
        this.setState({recentLoading: true})

        this.bedsRef().get()
            .then(({ docs }) =>
                docs.map(({ id }) =>
                    this.bedsRef().doc(id)
                        .collection('bookings')
                        .where('status', '==', 'booked')
                        .where('start_date', '>=', this.props.moment().format('YYYY-MM-DD'))
                        .get()
            ))
            .then(bookings => Promise.all(bookings))
            .then(bookings => bookings.map(({ docs }) => docs))
            .then(bookings => bookings.reduce((flatArr, booking) => [...flatArr, ...booking], []))
            .then(bookings => this.setState({ recent: bookings, recentLoading: false }))
            .catch(err => console.log(err))
    }

    getFilterBookings = (start, end, filter) => {
        if (!start || !end) {
            return
        }

        this.setState({searchResults: null, searchLoading: true})

        this.bedsRef().get()
            .then(({ docs }) =>
                docs.map(({ id }) => {
                    let bookingsRef = this.bedsRef().doc(id).collection('bookings')
                    if (!filter) {
                        return bookingsRef
                            .where('start_date', '>=', start)
                            .where('start_date', '<=', end)
                            .get()
                    } else {
                        return bookingsRef
                            .where('start_date', '>=', start)
                            .where('start_date', '<=', end)
                            .where('status', '==', filter)
                            .get()
                    }
                })
            )
            .then(bookings => Promise.all(bookings))
            .then(bookings => bookings.map(({ docs }) => docs))
            .then(bookings => bookings.reduce((flatArr, booking) => [...flatArr, ...booking], []))
            .then(bookings => this.setState({ searchResults: bookings, searchLoading: false }))
            .catch(err => console.log(err))
    }

    getEmailBookings = email => {
        this.setState({ searchResults: null, searchLoading: true })

        this.bedsRef().get()
            .then(({docs}) =>
                docs.map(({id}) =>
                    this.bedsRef()
                        .doc(id)
                        .collection('bookings')
                        .where('email', '==', email)
                        .get()
                )
            )
            .then(bookings => Promise.all(bookings))
            .then(bookings => bookings.map(({ docs }) => docs))
            .then(bookings => bookings.reduce((flatArr, booking) => [...flatArr, ...booking], []))
            .then(bookings => this.setState({ searchResults: bookings, searchLoading: false }))
    }

    updateBookingStatus = (booking, status) => this.props.firestore.doc(booking.ref.path).update({ status: status })

    cancelBooking = booking => this.updateBookingStatus(booking, 'canceled')
        .then(() => this.setState({
            recent: this.state.recent.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path)
        }))
        .catch(err => console.log(err))

    confirmBooking = booking => this.updateBookingStatus(booking, 'confirmed')
        .then(() => this.setState({
            recent: this.state.recent.filter(renderedBooking => renderedBooking.ref.path !== booking.ref.path)
        }))
        .catch(err => console.log(err))

    setFilter = filter => this.setState({activeFilter: filter})

    setFilterType = type => this.setState({searchToggled: type})

    render() {
        const {start_date, end_date, activeFilter, recent, searchResults, email, filters, searchToggled, searchLoading, recentLoading } = this.state

        return (
            <div className={'Bookings'}>
                <h2
                    className={'App__title'}
                    onClick={() => !!searchToggled
                        ? searchToggled === 'date'
                            ? this.getFilterBookings(start_date, end_date, activeFilter)
                            : searchToggled === 'email'
                                ? this.getEmailBookings(email)
                                : null
                        : null
                    }
                >
                    Search
                </h2>

                <div className={'ActionBox ActionBox__toggler'}>
                    <div className={`${searchToggled === 'email' ? 'ActionBox--active' : ''}`} onClick={() => this.setFilterType('email')}>
                        Email
                    </div>

                    <div className={`${searchToggled === 'date' ? 'ActionBox--active' : ''}`} onClick={() => this.setFilterType('date')}>
                        Date
                    </div>
                </div>

                { searchToggled === 'email'
                    ? <div className={'ActionBox'}>
                        <input
                            type={'text'}
                            placeholder={'Booking email'}
                            onChange={e => this.setState({ email: e.target.value })}
                            className={'App__input'}
                        />
                    </div>
                    : null
                }

                { searchToggled === 'date'
                    ? <div className={'Bookings__filter'}>
                        <div className={'Bookings__time'}>
                            <span className={'Bookings__time-title'}>
                                Start
                            </span>

                            <input
                                className={'Bookings__time-input'}
                                onChange={e => this.setState({ start_date: e.target.value })}
                                type={'date'}
                                placeholder={'Birthdate'}
                            />

                            <span className={'Bookings__time-title'}>
                                End
                            </span>

                            <input
                                className={'Bookings__time-input'}
                                onChange={e => this.setState({ end_date: e.target.value })}
                                type={'date'}
                                placeholder={'Birthdate'}
                            />
                        </div>

                        <div className={'Bookings__filter-options'}>
                            <Categories
                                categories={filters}
                                setCategory={this.setFilter}
                                activeCategory={activeFilter}
                            />
                        </div>
                    </div>
                    : null
                }

                { searchLoading
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }

                { searchResults
                    ? <Tickets
                        title={searchResults.length > 0 ? false : 'No search result'}
                        data={searchResults}
                        onConfirmClick={this.confirmBooking}
                        onCancelClick={this.cancelBooking}
                    />
                    : null
                }

                <Tickets
                    title={recent.length > 0 ? 'Recent bookings' : 'No recent bookings'}
                    data={recent}
                    onConfirmClick={this.confirmBooking}
                    onCancelClick={this.cancelBooking}
                />

                {recentLoading
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }
            </div>
        );
    }
}