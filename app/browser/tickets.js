import React, { Component, Fragment } from 'react';
import Ticket from './ticket';



export default class Tickets extends Component {
    render() {
        const {title, data, onConfirmClick, onCancelClick, loading = [], reload} = this.props

        return (
            <Fragment>
                { !!title
                    ? <h2 className={'App__title'} onClick={() => !!reload ? reload() : null}>
                        {title}
                    </h2>
                    : null
                }

                <div className={'Ticket__container'}>
                    {data.map((booking, i) => {
                        return <Ticket
                            key={i}
                            {...booking.data()}
                            loading={loading.includes(booking.id)}
                            onConfirmClick={() => onConfirmClick(booking)}
                            onCancelClick={() => onCancelClick(booking)}
                            moment={this.props.moment}
                        /> 
                    })}
                </div>
            </Fragment>
        );
    }
}