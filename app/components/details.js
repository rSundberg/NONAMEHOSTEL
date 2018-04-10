import React, { Component } from 'react';

export default class Details extends Component {
    state = {
        name: null,
        email: null,
        phone: null,
        country: null
    }

    setName = event => this.setState({name: event.target.value}, this.setDetails)

    setEmail = event => this.setState({email: event.target.value}, this.setDetails)

    setPhone = event => this.setState({phone: event.target.value}, this.setDetails)

    setCountry = event => this.setState({country: event.target.value}, this.setDetails)

    setMessage = event => this.setState({message: event.target.value}, this.setDetails)

    setDetails = () => this.props.getDetails(this.state)

    render() {
        return (
            <div className={'Details'}>
                <input onChange={this.setName} type={'text'} placeholder={'Name'} />
                <input onChange={this.setEmail} type={'email'} placeholder={'Email'}/>
                <input onChange={this.setPhone} type={'tel'} placeholder={'Phone / Whatsapp'}/>
                <input onChange={this.setCountry} type={'text'} placeholder={'Country'} />
                <textarea onChange={this.setMessage} placeholder={'Tell us something cool'} />
            </div>
        );
    }
}