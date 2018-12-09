import React, { Component } from 'react'

import '../shared/css/ticket.css'

import CampIcon from '../shared/media/camp_bed_stay.svg'
import DormIcon from '../shared/media/dorm_stay.svg'
import FreeIcon from '../shared/media/free_stay.svg'
import RoomIcon from '../shared/media/room_stay.svg'
import Settings from '../shared/media/settings.svg'

export default class Ticket extends Component {
    state = {
        infoIsOpen: false,
        actionsIsOpen: false
    }

    toggleInfo = () => this.setState(({ infoIsOpen }) => ({
        infoIsOpen: !infoIsOpen,
        actionsIsOpen: false
    }))

    toggleActions = () => this.setState(({ actionsIsOpen }) => ({
        infoIsOpen: false,
        actionsIsOpen: !actionsIsOpen
    }))

    render() {
        const {
            onConfirmClick,
            onCancelClick,
            start_date,
            end_date,
            bed_type,
            bed_count,
            name,
            email,
            phone,
            country,
            room_count,
            status,
            message,
            moment,
            isMember,
            loading
        } = this.props

        const {
            infoIsOpen,
            actionsIsOpen
        } = this.state

        return (
            <div className={`Ticket ${isMember ? 'Ticket--member' : ''}`}>
                <div className={`Ticket__main-bar`}>
                    <div className={'Ticket__date-wrapper'}>
                        <div className={'Ticket__date'}>
                            <span>{moment(start_date).format('D')}</span>
                            <span>{moment(start_date).format('MMM')}</span>
                        </div>

                        <div className={'Ticket__date'}>
                            <span>{moment(end_date).format('D')}</span>
                            <span>{moment(end_date).format('MMM')}</span>
                        </div>
                    </div>

                    <div className={'Ticket__main-info'}>
                        <Settings
                            width={30}
                            onClick={this.toggleActions}
                            className={`${actionsIsOpen ? 'Ticket__main-info--active' : ''}`}
                        />

                        <h2
                            className={`${infoIsOpen ? 'Ticket__main-info--active' : ''}`}
                            onClick={this.toggleInfo}
                        >
                            {name}
                        </h2>
                    </div>

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

                { infoIsOpen
                    ? <div className={'Ticket__info-bar'}>
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
                                {room_count === 0 ? 'room' : 'rooms'}
                            </div>
                            : null

                        }

                        <div className={'Ticket__info'}>
                            {status}
                        </div>

                        <div className={'Ticket__info'}>
                            {message}
                        </div>
                    </div>
                    : null
                }

                { actionsIsOpen
                    ? <div className={`Ticket__action-bar ${loading ? 'App__loading' : ''}`}>
                        <div className={'Ticket__action Ticket__action--confirm'} onClick={onConfirmClick}>
                            Confirm
                        </div>

                        <div className={'Ticket__action Ticket__action--cancel'} onClick={onCancelClick}>
                            Cancel
                        </div>
                    </div>
                    : null
                }

            </div>
        );
    }
}