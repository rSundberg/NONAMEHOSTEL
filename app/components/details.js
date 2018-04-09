import React, { Component } from 'react';

export default class Details extends Component {
    render() {
        return (
            <div className={'Details'}>
                <input type={'text'} placeholder={'Name'} />
                <input type={'email'} placeholder={'Email'}/>
                <input type={'phone'} placeholder={'Phone / Whatsapp'}/>
                <textarea placeholder={'Tell us something cool'} />
            </div>
        );
    }
}