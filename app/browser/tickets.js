import React, { Component, Fragment } from 'react';

import Ticket from './ticket'

import DormStay from '../shared/media/dorm_stay.svg'
import RoomStay from '../shared/media/room_stay.svg'
import CampStay from '../shared/media/camp_bed_stay.svg'
import FreeStay from '../shared/media/free_stay.svg'

export default class Tickets extends Component {
    render() {
        return (
            <Fragment>
                <h2 className={'CheckIn__title'}>
                    {this.props.title}
                </h2>

                {this.props.data.map((booking, i) => {
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

                        <div className={`Ticket__action-button ${this.props.actionClass}`} onClick={() => this.props.ticketAction(booking)}>
                            Confirm Booking
                        </div>
                    </Ticket>
                })}
            </Fragment>
        );
    }
}