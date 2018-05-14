import React, { Component } from 'react'
import firebase from 'firebase/app'

import DormStay from '../dorm_stay.svg'
import RoomStay from '../room_stay.svg'
import SleepingBagStay from '../sleepingbag_stay.svg'

import Counter from './counter'

export default ({active, getBed}) => 
    <div className={'Beds'}>
        <div
            className={`Beds__card ${active === 'free' ? 'Beds__card--active' : ''}`}
            onClick={() => getBed('free')}>
            <SleepingBagStay />
            Free
        </div>

        <div
            className={`Beds__card ${active === 'dorm' ? 'Beds__card--active' : ''}`}
            onClick={() => getBed('dorm')}>
            <DormStay />
            Dorm
        </div>

        <div
            className={`Beds__card ${active === 'room' ? 'Beds__card--active' : ''}`}
            onClick={() => getBed('room')}>
            <RoomStay />
            Room
        </div>
    </div>