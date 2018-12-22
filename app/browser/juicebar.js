import React, { Component } from 'react'
import Loadable from 'react-loadable'

import Loader from './loader'

const Recipes = Loadable({
    loader: () => import(/* webpackChunkName: 'recipes' */ './recipes'),
    loading: defaultProps => <Loader {...defaultProps} height={50} title={'Recipes'} />,
    delay: 600
})

const Orders = Loadable({
    loader: () => import(/* webpackChunkName: 'orders' */ './orders'),
    loading: defaultProps => <Loader {...defaultProps} height={50} title={'Orders'} />,
    delay: 600
})

import '../shared/css/juicebar.css'

export default class Juicebar extends Component {
    state = {
        activeAction: null
    }

    toggleAction = action => {
        this.setState(({activeAction}) =>
            ({activeAction: activeAction === action ? null : action})
        )
    }

    render() {
        const {activeAction} = this.state
        const {firestore, storage, moment} = this.props

        return (
            <div className={'Juicebar'}>
                <div className={'Juicebar__actions'}>
                    <div
                        className={`Juicebar__action-button ${activeAction === 'recipes' ? 'Juicebar__action-button--active' : ''}`}
                        onClick={() => this.toggleAction('recipes')}>
                        Recipes
                    </div>

                    <div
                        className={`Juicebar__action-button ${activeAction === 'orders' ? 'Juicebar__action-button--active' : ''}`}
                        onClick={() => this.toggleAction('orders')}>
                        Orders
                    </div>
                </div>

                { activeAction === 'recipes'
                    ? <Recipes firestore={firestore} storage={storage} />
                    : null
                }

                { activeAction === 'orders'
                    ? <Orders firestore={firestore} storage={storage} moment={moment}/>
                    : null
                }
            </div>
        )
    }
}