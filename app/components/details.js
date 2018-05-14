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
        localforage.getItem('bookingDetails').then(details =>
            this.setState(details, () => this.props.getDetails(this.state))
        )
    }

    setName = event => this.setState({name: event.target.value})

    setEmail = event => this.setState({email: event.target.value})

    setPhone = event => this.setState({phone: event.target.value})

    setCountry = event => this.setState({country: event.target.value})

    setMessage = event => this.setState({ message: event.target.value }, this.props.getDetails(this.state))

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