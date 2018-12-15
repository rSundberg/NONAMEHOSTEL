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

    activeRecipe = (id, bool) => this.props.firestore.collection('recipes').doc(id).update({active: bool})
        .then(() => this.props.firestore.collection('recipes').doc(id).get())
        .then(doc => {
            this.setState(({recipes}) => {
                let withoutOldDoc = recipes.filter(recipe => recipe.id !== id)

                withoutOldDoc.push(doc)

                return ({recipes: withoutOldDoc})
            })
        })

    deleteRecipe = id => this.props.firestore.collection('recipes').doc(id).delete()
        .then(() => this.setState(({recipes}) => ({recipes: recipes.filter(recipe => recipe.id !== id)})))

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
                    ? <Recipes
                        data={recipes}
                        addRecipe={this.addRecipe}
                        activeRecipe={this.activeRecipe}
                        deleteRecipe={this.deleteRecipe}
                    />
                    : null
                }
            </div>
        )
    }
}