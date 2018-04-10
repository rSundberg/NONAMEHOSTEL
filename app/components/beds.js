import React, { Component, Fragment } from 'react'

import FreeStay from '../free_stay.svg'
import DormStay from '../dorm_stay.svg'
import RoomStay from '../room_stay.svg'
import SleepingBagStay from '../sleepingbag_stay.svg'
import CampStay from '../camp_bed_stay.svg'

export default class Beds extends Component {
    state = {
        bed_type: null,
        bed_count: 1
    }

    updateType = card => this.setState({bed_type: card}, () => this.props.getBed(this.state))

    updateCount = amount => {
        if (this.state.bed_count === 1 && amount === -1) {
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
                            <div className={'Beds__card'}>
                                <CampStay />
                                Camp beds
                            </div>
                            <div className={'Beds__card'}>
                                <FreeStay/>
                                Pitch your tent
                            </div>
                        </div>
                    </div>
                    <div className={'Beds__amount'}>
                        How many people are you booking for?

                        <div className={'Beds__counter'}>
                            <div onClick={() => this.updateCount(-1)}>
                                {this.state.bed_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.bed_count}
                            </div>
                            <div onClick={() => this.updateCount(1)}>
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
                            <div onClick={() => this.updateCount(-1)}>
                                {this.state.bed_count === 1 ? '' : '-'}
                            </div>
                            <div>
                                {this.state.bed_count}
                            </div>
                            <div onClick={() => this.updateCount(1)}>
                                +
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}