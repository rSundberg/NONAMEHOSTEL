import React from 'react'
import moment from 'moment';

import 'react-dates/initialize'
import {DayPickerRangeController} from 'react-dates'

import {isInclusivelyAfterDay, getDateRange} from '../utils/utils'

import 'react-dates/lib/css/_datepicker.css'

export default class Calendar extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        focusedInput: 'startDate'
    }

    handleChange = ({startDate, endDate}) => {
        const {blockedDays, getDate} = this.props

        this.setState({startDate, endDate})

        if (startDate && endDate) {
            if (getDateRange(moment(startDate), moment(endDate), 'YYYY-MM-DD').some(day => blockedDays.includes(day))) {
                this.setState({startDate: null, endDate: null})

                return
            }

            getDate(startDate, endDate)

        }
    }

    handleFocus = input => this.setState({
        focusedInput: !input
            ? 'startDate'
            : 'endDate'
    })

    render() {
        let {startDate, endDate, focusedInput} = this.state;

        return (
            <div className={'Calendar'}>
                <DayPickerRangeController
                    numberOfMonths={1}
                    daySize={40}
                    hideKeyboardShortcutsPanel={true}
                    isDayBlocked={day => {
                        const isBefore = day.isBefore(moment().format('YYYY-MM-DD'))

                        if (isBefore) return false

                        return this.props.blockedDays.includes(day.format('YYYY-MM-DD'))
                    }}
                    isOutsideRange={day => !isInclusivelyAfterDay(day, moment()) }
                    startDate={startDate}
                    endDate={endDate}
                    focusedInput={focusedInput}
                    onDatesChange={this.handleChange}
                    onFocusChange={this.handleFocus}/>
            </div>
        )
    }
}
