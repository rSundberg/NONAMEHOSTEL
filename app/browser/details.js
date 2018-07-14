import React, { Component } from 'react'
import localforage from 'localforage'

export default class Details extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        country: '',
        message: ''
    }

    componentDidMount() {
        localforage.getItem('bookingDetails')
            .then(details => this.setState(details, () => this.props.getDetails(this.state)))
            .catch(err => console.log(err))
    }

    setName = event => this.setState({ name: this.capitalizeData(event.target.value) })

    setEmail = event => this.setState({ email: this.capitalizeData(event.target.value) })

    setPhone = event => this.setState({ phone: event.target.value })

    setCountry = event => this.setState({ country: this.capitalizeData(event.target.value) })

    setMessage = event => this.setState({ message: event.target.value }, this.props.getDetails(this.state))

    capitalizeData = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    render() {
        const {name, email, phone, country, message} = this.state

        return (
            <div className={'Details'}>
                <input value={name} onChange={this.setName} type={'text'} placeholder={'Name'} />
                <input value={email} onChange={this.setEmail} type={'email'} placeholder={'Email'}/>
                <input value={phone} onChange={this.setPhone} type={'tel'} placeholder={'Phone / Whatsapp'}/>
                <input value={country} onChange={this.setCountry} type={'text'} placeholder={'Country'} />
                <textarea value={message} onChange={this.setMessage} placeholder={'Tell us something cool'} />
            </div>
        );
    }
}