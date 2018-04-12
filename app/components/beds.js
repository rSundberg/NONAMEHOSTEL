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
        room_count: 1,
        rooms_confirmed: false
    }

    db = firebase.firestore()

    bookings = this.db.collection("locations").doc(this.props.location).collection('bookings');

    pickBedDetails = obj => Object
        .keys(obj)
        .filter(key => key !== 'rooms_confirmed')
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: this.state[key]
            }
        }, {})

    updateType = card => this.setState({
        bed_type: card
    }, () => this.props.getBed(this.pickBedDetails(this.state)))

    updateAlternative = alternative => this.setState({
        bed_alternative: alternative
    }, () => this.props.getBed(this.pickBedDetails(this.state)))

    componentDidMount() {
        this.bookings
            .where("location", "==", this.props.location)
            .where("end_date", ">", this.props.start_date)
            .get().then(doc => {
                if (doc.exists) {
                    doc.forEach(item => {
                        console.log('ey')
                        console.log(item.data())
                    })
                } else {
                    this.setState({rooms_confirmed: !this.state.rooms_confirmed})
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

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
        let {rooms_confirmed, bed_type, room_count, bed_count, bed_alternative} = this.state

        return (
            <Fragment>
                {
                    rooms_confirmed ? null :
                        <div className={'Beds'}>
                            <div className={'Beds__loader'}>
                                Checking availability...
                            </div>
                        </div>
                }
                { rooms_confirmed ?
                    <div className={'Beds'}>
                        <div className={`Beds__card ${bed_type === 'free' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('free')}>
                            < SleepingBagStay />
                            Free
                        </div>
                        <div className={`Beds__card ${bed_type === 'dorm' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('dorm')}>
                            <DormStay/>
                            Dorm
                        </div>
                        <div className={`Beds__card ${bed_type === 'room' ? 'Beds__card--active' : ''}`} onClick={() => this.updateType('room')}>
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
                    </div> : null
                }

                { rooms_confirmed ?
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
                    </div> : null
                }

                { bed_type === 'room' && rooms_confirmed ?
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