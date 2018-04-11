import React, { Component, Fragment } from 'react'

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

    updateType = card => this.setState({bed_type: card}, () => this.props.getBed(this.state))

    updateAlternative = alternative => this.setState({bed_alternative: alternative}, () => this.props.getBed(this.state))

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
        if (this.state.bed_type === 'free') {
            return (
                <Fragment>
                    <div className={'Beds'}>
                        <div className={`Beds__card ${this.state.bed_type === 'free' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('free')}>
                            < SleepingBagStay />
                            Free
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'dorm' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('dorm')}>
                            <DormStay/>
                            Dorm
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'room' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('room')}>
                            <RoomStay/>
                            Room
                        </div>
                        <div className={'Beds__alternatives'}>
                            <div className={`Beds__card ${this.state.bed_alternative === 'campbed' ? 'Beds__card--active' : ''}`} onClick={() => this.updateAlternative('campbed')}>
                                <CampStay />
                                Camp beds
                            </div>
                            <div className={`Beds__card ${this.state.bed_alternative === 'tent' ? 'Beds__card--active' : ''}`} onClick={() => this.updateAlternative('tent')}>
                                <FreeStay/>
                                Pitch your tent
                            </div>
                        </div>
                    </div>
                    <div className={'Beds__amount'}>
                        How many people are you booking for?

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateBedCount(-1)}>
                                {this.state.bed_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.bed_count}
                            </div>
                            <div onClick={() => this.updateBedCount(1)}>
                                +
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else if (this.state.bed_type === 'room') {
            return (
                <Fragment>
                    <div className={'Beds'}>
                        <div className={`Beds__card ${this.state.bed_type === 'free' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('free')}>
                            < SleepingBagStay />
                            Free
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'dorm' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('dorm')}>
                            <DormStay/>
                            Dorm
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'room' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('room')}>
                            <RoomStay/>
                            Room
                        </div>
                    </div>
                    <div className={'Beds__amount'}>
                        How many people are you booking for?

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateBedCount(-1)}>
                                {this.state.bed_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.bed_count}
                            </div>
                            <div onClick={() => this.updateBedCount(1)}>
                                +
                            </div>
                        </div>
                    </div>
                    <div className={'Beds__amount'}>
                        Number of rooms

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateRoomCount(-1)}>
                                {this.state.room_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.room_count}
                            </div>
                            <div onClick={() => this.updateRoomCount(1)}>
                                +
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className={'Beds'}>
                        <div className={`Beds__card ${this.state.bed_type === 'free' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('free')}>
                            < SleepingBagStay />
                            Free
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'dorm' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('dorm')}>
                            <DormStay/>
                            Dorm
                        </div>
                        <div className={`Beds__card ${this.state.bed_type === 'room' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('room')}>
                            <RoomStay/>
                            Room
                        </div>
                    </div>
                    <div className={'Beds__amount'}>
                        How many people are you booking for?

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateBedCount(-1)}>
                                {this.state.bed_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.bed_count}
                            </div>
                            <div onClick={() => this.updateBedCount(1)}>
                                +
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}