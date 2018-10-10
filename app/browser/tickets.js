import React, { Component, Fragment } from 'react';

import Ticket from './ticket'
import Loader from './loader'

import DormIcon from '../shared/media/dorm_stay.svg'
import RoomIcon from '../shared/media/room_stay.svg'
import CampIcon from '../shared/media/camp_bed_stay.svg'
import FreeIcon from '../shared/media/free_stay.svg'
import CheckIcon from '../shared/media/checkmark.svg'
import CancelIcon from '../shared/media/cancel.svg'

export default class Tickets extends Component {
    render() {
        const {title, data, onConfirmClick, onCancelClick, loading = [], reload} = this.props

        return (
            <Fragment>
                { !!title
                    ? <h2 className={'App__title'} onClick={() => !!reload ? reload() : null}>
                        {title}
                    </h2>
                    : null
                }
                <div className={'Ticket__container'}>
                    {data.map((booking, i) => {
                        const { name, email, phone, country, bed_count, room_count, start_date, end_date, bed_type, status } = booking.data()

                        return <Ticket key={i}>
                            <div className={`Ticket__action-bar`}>
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

                                <div className={'Ticket__info'}>
                                    {status}
                                </div>
                            </div>

                            {onConfirmClick || onCancelClick
                                ? <div className={`Ticket__action-icon ${loading.includes(booking.id) ? 'App__loading' : ''}`}>
                                        {onConfirmClick
                                            ? <div
                                                className={'Ticket__action-icon--confirm'}
                                                onClick={() => onConfirmClick(booking)}
                                            >
                                                <CheckIcon />
                                            </div>
                                            : null

                                        }

                                        {onCancelClick
                                            ? <div
                                                className={'Ticket__action-icon--cancel'}
                                                onClick={() => onCancelClick(booking)}
                                            >
                                                <CancelIcon />
                                            </div>
                                            : null
                                        }
                                    </div>
                                : null
                            }
                        </Ticket>
                    })}
                </div>
            </Fragment>
        );
    }
}