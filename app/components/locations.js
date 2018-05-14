import React from 'react';

export default class Locations extends React.Component {
    state = {
        active: null
    }

    setActive = card => this.setState({
        active: card
    }, () => {
        this
            .props
            .getLocation(this.state.active)
    })

    render() {
        return (
            <div className={'Locations'}>
                <div
                    className={`Locations__card ${this.props.currentLocation === 'goa'
                    ? 'Locations__card--active'
                    : ''}`}
                    onClick={() => this.setActive('goa')}>
                    <h2>Goa</h2>
                    <img/>
                </div>
                <div
                    className={`Locations__card ${this.props.currentLocation === 'himachal'
                    ? 'Locations__card--active'
                    : ''}`}
                    onClick={() => this.setActive('himachal')}>
                    <h2>Himachal</h2>
                    <img/>
                </div>
            </div>
        )
    }
}