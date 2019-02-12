import React, { Component, Fragment } from 'react'
import fetch from 'isomorphic-fetch'

import '../shared/css/details.css'

export default class Details extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        isMember: false,
        error: false,
        emailVerified: false,
        loading: false
    }

    setName = event => this.setState({ name: event.target.value })

    setEmail = event => this.setState({ email: event.target.value })

    setPhone = event => this.setState({ phone: event.target.value })

    setCountry = event => this.setState({ country: event.target.value })

    setMessage = event => this.setState({ message: event.target.value })

    onNextClick = () => {
        this.setState({loading: true, error: false})

        this.getMembership(this.state.email)
            .then(data => {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    this.setState({ isMember: false, emailVerified: true, loading: false })
                } else {
                    const { name, phone, country } = data

                    this.setState({
                        name: name,
                        phone: phone,
                        country: country,
                        isMember: true,
                        emailVerified: true,
                        loading: false
                    })
                }
            })
            .catch(err => this.setState({loading: false, error: true}))
    }

    getMembership = email => {
        let url = 'https://us-central1-nonamehostel-a5e96.cloudfunctions.net/isMember',
            query = `?email=${email}`

        return fetch(`${url}${query}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }

    makeLowerCase = ({ name = '', email = '', phone = '', country = '', message = '', isMember = false }) => {
        return {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            phone: phone,
            country: country.toLowerCase(),
            message: message,
            isMember: isMember
        }
    }

    validData = ({ name = '', email = '', phone = '', country = '', message = ''}) => {
        function foundEmptyString(strArr) {
            return strArr.some(str => str.length === 0)
        }

        if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(email) || foundEmptyString([name, email, phone, country, message])) {
            return false
        } else {
            return true
        }

    }

    confirmInfo = () => {
        if (this.validData(this.state)) {
            this.setState({error: false})

            this.props.getDetails(this.makeLowerCase(this.state))
        } else {
            this.setState({error: true})
        }
    }

    render() {
        const {name, email, phone, country, message, error, emailVerified, loading} = this.state

        return (
            <Fragment>
                <div className={'Details'}>
                    <input value={email} onChange={this.setEmail} type={'email'} placeholder={'Email'} />

                    {emailVerified
                        ? <Fragment>
                            <input value={name} onChange={this.setName} type={'text'} placeholder={'Name'} />

                            <input value={phone} onChange={this.setPhone} type={'tel'} placeholder={'Phone / Whatsapp'} />

                            <input value={country} onChange={this.setCountry} type={'text'} placeholder={'Country'} />

                            <textarea value={message} onChange={this.setMessage} placeholder={'Tell us something cool'} />
                        </Fragment>
                        : null
                    }
                </div>

                <div className={`Booking__confirm ${loading ? 'Booking__loader' : ''}`} onClick={emailVerified ? this.confirmInfo : this.onNextClick}>
                    {emailVerified ? 'Confirm details' : 'Next'}
                </div>

                {error
                    ? <div className={'Details__error'}>
                        Please double check your information
                    </div>
                    : null
                }
            </Fragment>
        );
    }
}