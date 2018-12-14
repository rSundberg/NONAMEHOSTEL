import React, { Component } from 'react'

import Recipes from './recipes'
import Orders from './orders'

import '../shared/css/juicebar.css'

export default class Juicebar extends Component {
    state = {
        activeAction: null,
        recipes: []
    }

    componentDidMount = () => {
        this.getRecipies().then((snapshot) => this.setState({recipes: snapshot.docs}))
    }

    toggleAction = action => {
        this.setState(({activeAction}) =>
            ({activeAction: activeAction === action ? null : action})
        )
    }

    getRecipies = () => this.props.firestore.collection('recipes').get()

    addRecipe = data => this.props.firestore.collection('recipes').add(data)

    render() {
        const {activeAction, recipes} = this.state

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
                    ? <Recipes data={recipes} addRecipe={this.addRecipe} />
                    : null
                }
            </div>
        )
    }
}