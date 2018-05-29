import React, { Component, Fragment } from 'react'
import anime from 'animejs'

export default class StartSection extends Component {
    state = {

    }

    render() {
        return (
            <Fragment>
                <div className={'StartSection'}>
                    <h1 className={'StartSection__title'}>
                        Make the life changing experience of travel accessible to everyone
                    </h1>
                </div>

                <div className={'StartSection'}>
                    <h1 className={'StartSection__title'}>
                        Join our family of friends and strangers,
                        all part of a greater global community named Home Collective.
                    </h1>
                </div>

                <div className={'StartSection'}>
                    <h1 className={'StartSection__title'}>
                        Help Home Collective and express your freedom
                        through co - creation, contribute to
                        the vision in your unique way.
                    </h1>
                </div>
                
                <div className={'StartSection'}>
                    <h1 className={'StartSection__title'}>
                        We are looking for new friends! Are you interested in volunteering?
                        Join our volunteer program.
                    </h1>
                </div>
            </Fragment>
        );
    }
}