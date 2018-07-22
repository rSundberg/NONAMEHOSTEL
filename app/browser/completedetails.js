import React, { Component } from 'react'

import '../shared/css/completedetails.css'

import CheckIcon from '../shared/media/checkmark.svg'

export default class CompleteDetails extends Component {
    name = React.createRef()
    
    email = React.createRef()

    phone = React.createRef()

    country = React.createRef()

    birthdate = React.createRef()

    address = React.createRef()

    onConfirmClick = () => this.props.confirm({
        name: this.name.current.value,
        email: this.email.current.value,
        phone: this.phone.current.value,
        country: this.country.current.value,
        birthdate: this.birthdate.current.value,
        address: this.address.current.value
    })

    render() {
        const {name, email, phone, country, birthdate, address, loading} = this.props

        return (
            <div className={'CompleteDetails'}>
                <input
                    className={'CompleteDetails__input'}
                    defaultValue={name}
                    ref={this.name}
                    type={'text'}
                    placeholder={'Name'}
                />

                <input
                    className={'CompleteDetails__input'}
                    defaultValue={email}
                    ref={this.email}
                    type={'email'}
                    placeholder={'Email'}
                />

                <input
                    className={'CompleteDetails__input'}
                    defaultValue={phone}
                    ref={this.phone}
                    type={'tel'}
                    placeholder={'Phone / Whatsapp'}
                />

                <input
                    className={'CompleteDetails__input'}
                    defaultValue={country}
                    ref={this.country}
                    type={'text'}
                    placeholder={'Country'}
                />

                <input
                    className={'CompleteDetails__input'}
                    defaultValue={birthdate}
                    ref={this.birthdate}
                    type={'date'}
                    placeholder={'Birthdate'}
                />

                <input
                    className={'CompleteDetails__input'}
                    defaultValue={address}
                    ref={this.address}
                    type={'text'}
                    placeholder={'Address'}
                />

                <div
                    className={`App__confirm ${loading ? 'App__loading' : ''}`}
                    onClick={!loading ? this.onConfirmClick : null}
                >
                    <CheckIcon className={'CompleteDetails__icon'} />
                </div>
            </div>
        )
    }
}