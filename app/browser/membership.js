import React, { Component } from 'react';

import '../shared/css/membership.css'

export default class Membership extends Component {
    render() {
        return (
            <div className={'Membership'}>
                <h2 className={'Page__title'}>Membership</h2>

                <h2 className={'App__title'}>What is it about?</h2>

                <div>
                    We are collecting funds for  the daily running of the
                    hosting facility and lifestyle upgrades at the  homesite in Goa.
                    Included is the development of the HomeCollective web app, hosting of the developer team and requirements.
                </div>

                <div>
                    To join us as a Home Collective member, we ask for a contribution on
                    our funding campaign with a minimum of 12€
                    (approximately equal to 1000 Indian Rupees).
                </div>

                <div>
                    Apart from being a part of a global traveler collective idea,
                    the membership encourages longer stay at our home sites by
                    offering free stay up to 29 days with discounted prices for dorms and rooms.
                </div>

                <div>
                    For any queries regarding membership, write to us - <strong>freedormculture@nonamehostel.com</strong>
                </div>

                <div className={'Section__link'}>
                    <a href={'https://www.gofundme.com/nonamehostel'}>Contribute here</a>
                </div>
            </div>
        );
    }
}