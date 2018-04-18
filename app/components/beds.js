import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'

import FreeStay from '../free_stay.svg'
import DormStay from '../dorm_stay.svg'
import RoomStay from '../room_stay.svg'
import SleepingBagStay from '../sleepingbag_stay.svg'
import CampStay from '../camp_bed_stay.svg'

export default class Beds extends Component {
    state = {
        bed_type: null,
        bed_alternative: null,
        bed_count: 1,
        room_count: 1
    }

    updateType = type => this.setState({
        bed_type: type
    }, () => this.props.getBed(this.state))

    updateAlternative = alternative => this.setState({
        bed_alternative: alternative
    }, () => this.props.getBed(this.state))

    updateRoomCount = amount => {
        if (this.state.room_count === 1 && amount === -1) {
            return
        }

        if (this.state.room_count === this.state.bed_count && amount === 1) {
            return
        }

        let bedCount = this.state.room_count >= this.state.bed_count ?
            this.state.bed_count + amount :
            this.state.bed_count;

        this.setState({
            bed_count: bedCount,
            room_count: this.state.room_count + amount
        }, () => this.props.getBed(this.state))
    }

    updateBedCount = amount => {
        if (this.state.bed_count === 1 && amount === -1) {
            return
        }

        if (this.state.bed_count === this.state.room_count * 5 && amount === 1) {
            return
        }

        if (this.state.room_count === this.state.bed_count && amount -1) {
            return
        }

        this.setState({bed_count: this.state.bed_count + amount}, () => this.props.getBed(this.state))
    }

    render() {
        let {bed_type, room_count, bed_count, bed_alternative} = this.state

        return (
            <Fragment>
                <div className={'Beds'}>
                    <div
                        className={`Beds__card ${bed_type === 'free' ? 'Beds__card--active' : ''} ${!this.props.isAvailable(this.props.beds, 'free') ? 'Beds--disabled' : ''}`}
                        onClick={() => this.props.isAvailable(this.props.beds, 'free') ? this.updateType('free') : null}>
                        < SleepingBagStay />
                        Free
                    </div>
                    <div
                        className={`Beds__card ${bed_type === 'dorm' ? 'Beds__card--active' : ''} ${!this.props.isAvailable(this.props.beds, 'dorm') ? 'Beds--disabled' : ''}`}
                        onClick={() => this.props.isAvailable(this.props.beds, 'dorm') ? this.updateType('dorm') : null}>
                        <DormStay/>
                        Dorm
                    </div>
                    <div
                        className={`Beds__card ${bed_type === 'room' ? 'Beds__card--active' : ''} ${!this.props.isAvailable(this.props.beds, 'room') ? 'Beds--disabled' : ''}`}
                        onClick={() => this.props.isAvailable(this.props.beds, 'room') ? this.updateType('room') : null}>
                        <RoomStay/>
                        Room
                    </div>
                    { bed_type === 'free' ? 
                        <div className={'Beds__alternatives'}>
                            <div className={`Beds__card ${bed_alternative === 'campbed' ? 'Beds__card--active' : ''}`} onClick={() => this.updateAlternative('campbed')}>
                                <CampStay />
                                Camp beds
                            </div>
                            <div className={`Beds__card ${bed_alternative === 'tent' ? 'Beds__card--active' : ''}`} onClick={() => this.updateAlternative('tent')}>
                                <FreeStay/>
                                Pitch your tent
                            </div>
                        </div> : null
                    }
                </div>

                <div className={'Beds__amount'}>
                    How many people are you booking for?

                    <div className={'Beds__counter'}>
                        <div onClick={() => this.updateBedCount(-1)}>
                            {bed_count === 1 ? '' : '-'}
                        </div>
                        <div>
                            {bed_count}
                        </div>
                        <div onClick={() => this.updateBedCount(1)}>
                            +
                        </div>
                    </div>
                </div>

                { bed_type === 'room' ?
                    <div className={'Beds__amount'}>
                        Number of rooms

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateRoomCount(-1)}>
                                {room_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {room_count}
                            </div>
                            <div onClick={() => this.updateRoomCount(1)}>
                                +
                            </div>
                        </div>
                    </div> : null
                }
            </Fragment>
        )
    }
}