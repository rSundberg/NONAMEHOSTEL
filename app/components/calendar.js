import React from 'react'
import moment from 'moment';

import 'react-dates/initialize'
import {DayPickerRangeController} from 'react-dates'

import {isInclusivelyAfterDay} from '../utils/utils'

import 'react-dates/lib/css/_datepicker.css'

export default class Calendar extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        focusedInput: 'startDate'
    }

    handleChange = ({startDate, endDate}) => {
        console.log(startDate)
        this.setState({startDate, endDate})
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
                    isDayBlocked={day => false}
                    isOutsideRange={ day => !isInclusivelyAfterDay(day, moment()) }
                    startDate={startDate}
                    endDate={endDate}
                    focusedInput={focusedInput}
                    onDatesChange={this.handleChange}
                    onFocusChange={this.handleFocus}/>
                {/* <div className={'Calendar__confirmation'}>
                    <div className={'Calendar__date'}>
                        {startDate ? startDate.format('MMMM Do').toString() : null}
                    </div>
                    <div>
                        -
                    </div>
                    <div className={'Calendar__date'}>
                        {endDate ? endDate.format('MMMM Do').toString() : null}
                    </div>
                </div> */}
                <div className={'Calendar__confirm'}>
                    <span>
                        Book
                    </span>
                    <span>
                        {startDate ? startDate.format('MMMM Do').toString() : null}
                    </span>
                    <span>
                        {startDate ? '-' : ''}
                    </span>
                    <span>
                        {endDate ? endDate.format('MMMM Do').toString() : null}
                    </span>
                </div>
            </div>
        )
    }
}
