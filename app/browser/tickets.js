import React, { Component, Fragment } from 'react';

import Ticket from './ticket'

import DormIcon from '../shared/media/dorm_stay.svg'
import RoomIcon from '../shared/media/room_stay.svg'
import CampIcon from '../shared/media/camp_bed_stay.svg'
import FreeIcon from '../shared/media/free_stay.svg'
import CheckIcon from '../shared/media/checkmark.svg'

export default class Tickets extends Component {
    render() {
        return (
            <Fragment>
                <h2 className={'CheckIn__title'}>
                    {this.props.title}
                </h2>

                {this.props.data.map((booking, i) => {
                    const { name, email, phone, country, location, bed_count, room_count, start_date, end_date, bed_type } = booking.data()
                    console.log(bed_type)
                    return <Ticket key={i}>
                        <div className={`Ticket__action-bar`} onClick={() => this.props.ticketAction(booking)}>
                            <div className={'Ticket__bed'}>
                                {bed_type === 'tent'
                                    ? <FreeIcon />
                                    : bed_type === 'camp'
                                        ? <CampIcon />
                                        : bed_type === 'dorm'
                                            ? <DormIcon />
                                            : bed_type === 'room'
                                                ? <RoomIcon />
                                                : null
                                }

                                {bed_count}
                            </div>
                        </div>

                        <div className={'Ticket__info-bar'}>
                            <div className={'Ticket__info'}>
                                {name}
                            </div>

                            <div className={'Ticket__info'}>
                                {email}
                            </div>

                            <div className={'Ticket__info'}>
                                {phone}
                            </div>

                            <div className={'Ticket__info'}>
                                {country}
                            </div>

                            {room_count
                                ? <div className={'Ticket__info'}>
                                    {room_count} Rooms
                                </div>
                                : null

                            }

                            <div className={'Ticket__info'}>
                                {start_date} - {end_date}
                            </div>
                        </div>


                        <div className={'Ticket__action-icon'}>
                            <div className={'Ticket__action-icon--confirm'}>
                                <CheckIcon />
                            </div>
                            <div className={'Ticket__action-icon--cancel'}>
                            </div>
                        </div>
                    </Ticket>
                })}
            </Fragment>
        );
    }
}