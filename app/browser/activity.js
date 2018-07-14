import React, { Component } from 'react'

import '../shared/css/activity.css'

export default class Activity extends Component {
    render() {
        const {imageUrl, startDate, endDate, startTime, endTime, title, location, description, contact, category} = this.props

        return (
            <div className={'Activity'}>
                <div className={'Activity__category'}>
                    {category}
                </div>

                <div className={'Activity__picture-wrapper'}>
                    <img className={'Activity__picture'} src={imageUrl}/>
                </div>

                <div className={'Activity__info'}>
                    <div className={'Activity__info-item'}>
                        <strong>What</strong> {title}
                    </div>

                    <div className={'Activity__info-item'}>
                        <strong>Where</strong> {location}
                    </div>

                    <div className={'Activity__info-item'}>
                        <strong>Who</strong> {contact}
                    </div>

                    <div className={'Activity__info-item'}>
                        <strong>Info</strong> {description}
                    </div>
                </div>

                <div className={'Activity__time'}>
                    <div className={'Activity__time-item'}>
                        <strong>
                            Start
                        </strong>

                        <span>
                            {startDate}
                        </span>

                        <span>
                            {startTime}
                        </span>
                    </div>

                    <strong>
                        ->
                    </strong>

                    <div className={'Activity__time-item'}>
                        <strong>
                            End
                        </strong>

                        <span>
                            {endDate}
                        </span>

                        <span>
                            {endTime}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}