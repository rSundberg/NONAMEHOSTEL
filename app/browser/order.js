import React from 'react';

const Order = ({name, items, paid, served, id, payAction, deleteAction}) =>
    <div key={id} className={'Orders__ticket'}>
        <div className={'Orders__ticket-info'}>
            <h2 className={'Orders__ticket-title'}>{name}</h2>

            <div className={'Orders__ticket-items'}>
                {
                    items.map(item => <div className={'Orders__ticket-item'} key={item.id}>
                        <span>{item.name}</span>

                        <span>{item.quantity}</span>
                    </div>)
                }

                <div className={'Orders__ticket-item'}>
                    <h2 className={'Orders__title'}>Total:</h2>

                    <span>{items.reduce((sum, { price }) => sum + price, 0)}</span>
                </div>
            </div>
        </div>

        <div className={'Orders__ticket-actions'}>
            
            {deleteAction
                ?   <div
                    className={'Orders__ticket-action Orders__ticket-action--delete'} 
                    onClick={() => deleteAction(id)}
                >
                    Remove
                </div>
                : null
            }
            
            { !paid && served
                ? <div
                    className={'Orders__ticket-action'}
                    onClick={() => payAction(id, { paid: true })}
                >
                    Pay now
                </div>
                : null
            }

            { !served
                ? <div
                    className={'Orders__ticket-action'}
                    onClick={() => payAction(id, { served: true })}
                >
                    Serve now
                </div>
                : null
            }

            { served && paid
                ? <div
                    className={'Orders__ticket-action'}
                    onClick={() => payAction(id, { paid: false })}
                >
                    Unpay now
                </div>
                : null
            }
        </div>
    </div>

export default Order;