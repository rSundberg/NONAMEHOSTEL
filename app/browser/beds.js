import React, { Component } from 'react'

import DormStay from '../shared/media/dorm_stay.svg'
import RoomStay from '../shared/media/room_stay.svg'
import SleepingBagStay from '../shared/media/sleepingbag_stay.svg'

import Counter from './counter'

export default ({addBed, toggleBed, activeBed}) => 
    <div className={'Beds'}>
        <div
            className={`Beds__card ${activeBed === 'free' ? 'Beds__card--active' : ''}`}
            onClick={() => {
                toggleBed('free')
            }}>
            <SleepingBagStay />
            Free
        </div>

        <div
            className={`Beds__card ${activeBed === 'dorm' ? 'Beds__card--active' : ''}`}
            onClick={() => {
                toggleBed('dorm')
                addBed('dorm')
            }}>
            <DormStay />
            Dorm
        </div>

        <div
            className={`Beds__card ${activeBed === 'room' ? 'Beds__card--active' : ''}`}
            onClick={() => {
                toggleBed('room')
            }}>
            <RoomStay />
            Room
        </div>
    </div>