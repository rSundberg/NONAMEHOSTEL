import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'

import Section from './section'
import Loader from './loader'

const NoNameHostel = Loadable({
    loader: () => import(/* webpackChunkName: 'nonamehostel' */ './nonamehostel'),
    loading: defaultProps => <Loader {...defaultProps}/>
})

export default class StartSection extends Component {
    state = {
        activeSections: []
    }

    activateSection = section => {
        if (!this.includesSection(section)) {
            this.state.activeSections.push(section)
        }

        this.setState({
            activeSections: this.state.activeSections
        })
    }

    includesSection = section => {
        console.log(this.state.activeSections)
        return this.state.activeSections.includes(section)
    }

    render() {
        return (
            <Fragment>
                <div className={'StartSection'}>
                    <Section
                        title={'Make the life changing experience of travel accessible for everybody'}
                        description={'The project originated within an international group of friends linked by a common passion for traveling. The intention is to create and co-develop sustainable comunities providing free and affordable accommodation'}
                        link={'What to expect?'}
                        activate={() => this.activateSection('noname')}
                        content={<NoNameHostel />}
                        isOpen={this.includesSection('noname')}
                    />
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