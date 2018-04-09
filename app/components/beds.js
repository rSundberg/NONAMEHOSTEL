import React, { Component } from 'react'
import FreeStay from '../free_stay.svg'
import DormStay from '../dorm_stay.svg'
import RoomStay from '../room_stay.svg'

export default class Beds extends Component {
    state = {
        active: null
    }

    setActive = card => this.setState({active: card})

    render() {
        return (
            <div className={'Beds'}>
                <div className={`Beds__card ${this.state.active === 'free' ? 'Beds__card--active' : ''}`} onClick={() => this.setActive('free')}>
                    <FreeStay/>
                    Free
                </div>
                <div className={`Beds__card ${this.state.active === 'dorm' ? 'Beds__card--active' : ''}`} onClick={() => this.setActive('dorm')}>
                    <DormStay/>
                    Dorm
                </div>
                <div className={`Beds__card ${this.state.active === 'room' ? 'Beds__card--active' : ''} :`} onClick={() => this.setActive('room')}>
                    <RoomStay/>
                    Room
                </div>
            </div>
        );
    }
}