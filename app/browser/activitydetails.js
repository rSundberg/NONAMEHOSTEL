import React, { Component } from 'react'

import '../shared/css/activitydetails.css'

import Upload from '../shared/media/upload_profile_picture.svg'
import CheckIcon from '../shared/media/checkmark.svg'

export default class ActivityDetails extends Component {
    state = {
        previewPicture: null
    }

    picture = React.createRef()

    startDate = React.createRef()
    
    endDate = React.createRef()
    
    startTime = React.createRef()
    
    endTime = React.createRef()

    title = React.createRef()

    description = React.createRef()

    location = React.createRef()

    contact = React.createRef()

    triggerInput = input => input.current.click()
    
    previewPicture = () => {
        let reader = new FileReader()

        reader.onload = e => this.setState({ previewPicture: e.target.result })

        reader.readAsDataURL(this.picture.current.files[0])
    }

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
            imageFile: this.picture.current.files[0]
        }
    }
    
    render() {
        return (
            <div className={`ActivityDetails`}>
                <div
                    className={'ActivityDetails__picture-wrapper'}
                    onClick={() => this.triggerInput(this.picture)}>

                    {this.state.previewPicture
                        ? <img className={'ActivityDetails__picture'} src={this.state.previewPicture} />
                        : <Upload className={'ActivityDetails__picture-icon'}/>
                    }

                    <input
                        className={'ActivityDetails__picture-input'}
                        ref={this.picture}
                        type={'file'}
                        accept={'image/*'}
                        onChange={this.previewPicture}
                    />
                </div>

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

                    <div
                        className={`App__confirm ${this.props.loading ? 'App__loading' : ''}`}
                        onClick={() => !this.props.loading ? this.props.onConfirmClick(this.dataObj()) : null}
                    >
                        <CheckIcon className={'ActivityDetails__icon'} />
                    </div>
                </div>
            </div>
        )
    }
}