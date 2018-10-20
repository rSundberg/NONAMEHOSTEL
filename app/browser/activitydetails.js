import React, { Component } from 'react'

import '../shared/css/activitydetails.css'

import PictureInput from './pictureinput'

import CheckIcon from '../shared/media/checkmark.svg'

export default class ActivityDetails extends Component {
    state = {
        uploadBlob: null
    }

    startDate = React.createRef()
    
    endDate = React.createRef()
    
    startTime = React.createRef()
    
    endTime = React.createRef()

    title = React.createRef()

    description = React.createRef()

    location = React.createRef()

    contact = React.createRef()

    dataObj = () => {
        return {
            startDate: this.startDate.current.value,
            endDate: this.endDate.current.value,
            startTime: this.startTime.current.value,
            endTime: this.endTime.current.value,
            title: this.title.current.value,
            location: this.location.current.value,
            contact: this.contact.current.value,
            description: this.description.current.value,
            imageFile: this.state.uploadBlob
        }
    }
    
    render() {

        return (
            <div className={`ActivityDetails`}>
                <PictureInput
                    blob={blob => this.setState({uploadBlob: blob})}
                    preview={this.state.uploadBlob}
                />

                <div className={`ActivityDetails__time`}>
                    <div className={'ActivityDetails__time-item'}>
                        <strong>Start date</strong>

                        <input
                            className={'ActivityDetails__time-input'}
                            ref={this.startDate}
                            type={'date'}
                        />
                    </div>

                    <div className={'ActivityDetails__time-item'}>
                        <strong>Start time</strong>

                        <input
                            className={'ActivityDetails__time-input'}
                            ref={this.startTime}
                            type={'time'}
                        />
                    </div>

                    <div className={'ActivityDetails__time-item'}>
                        <strong>End date</strong>

                        <input
                            className={'ActivityDetails__time-input'}
                            ref={this.endDate}
                            type={'date'}
                        />
                    </div>

                    <div className={'ActivityDetails__time-item'}>
                        <strong>End time</strong>

                        <input
                            className={'ActivityDetails__time-input'}
                            ref={this.endTime}
                            type={'time'}
                        />
                    </div>
                </div>

                <div className={`ActivityDetails__info`}>
                    <input
                        className={'App__input'}
                        ref={this.title}
                        type={'text'}
                        placeholder={'What'}
                    />

                    <input
                        className={'App__input'}
                        ref={this.location}
                        type={'text'}
                        placeholder={'Where'}
                    />

                    <input
                        className={'App__input'}
                        ref={this.contact}
                        type={'text'}
                        placeholder={'Who'}
                    />

                    <textarea
                        className={'ActivityDetails__description'}
                        ref={this.description}
                        placeholder={'Info'}
                    />
                </div>

                <div
                    className={`App__confirm ${this.props.loading ? 'App__loading' : ''}`}
                    onClick={() => !this.props.loading ? this.props.onConfirmClick(this.dataObj()) : null}
                >
                    <CheckIcon className={'ActivityDetails__icon'} />
                </div>
            </div>
        )
    }
}