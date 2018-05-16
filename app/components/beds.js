import React, { Component } from 'react'
import firebase from 'firebase/app'

import DormStay from '../dorm_stay.svg'
import RoomStay from '../room_stay.svg'
import SleepingBagStay from '../sleepingbag_stay.svg'

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
                addBed('room')
            }}>
            <RoomStay />
            Room
        </div>
    </div>