import moment from 'moment';
import fetch from 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import 'react-dates/initialize'
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates'

import { isInclusivelyAfterDay } from './utils/utils'

import 'react-dates/lib/css/_datepicker.css';

class App extends React.Component {
    state = {
        startDate: null,
        endDate : null,
        focusedInput : 'startDate'
    }

    handleChange = ({startDate, endDate}) => this.setState({startDate, endDate})

    handleFocus = input => this.setState({
        focusedInput: !input ? 'startDate' : 'endDate'
    })

    componentDidMount() {

    }

    render() {
        return (
            <DayPickerRangeController
                numberOfMonths = {2}
                isOutsideRange = {
                    day => !isInclusivelyAfterDay(day, moment())
                }
                startDate = {this.state.startDate}
                endDate = {this.state.endDate}
                focusedInput = {this.state.focusedInput}
                onDatesChange = {this.handleChange}
                onFocusChange = {this.handleFocus}
            />
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))