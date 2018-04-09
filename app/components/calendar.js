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
        let {getDate} = this.props
        console.log(getDate)
        getDate(startDate, endDate);
        
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
            </div>
        )
    }
}
