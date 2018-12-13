import React, { Component } from 'react';

import ActionBox from './actionbox'

import '../shared/css/recipes.css'
import RecipeDetails from './recipedetails';

function Recipe({title, price}) {
    return <div className={'Recipes__box'}>
        <h2 className={'Recipes__title'}>{title}</h2>
        <span className={'Recipes__price'}>{price}</span>
    </div>
}

export default class Recipies extends Component {
    state = {
        addRecipeToggled: false
    }

    toggleAddRecipe = () => this.setState(({addRecipeToggled}) => ({addRecipeToggled: !addRecipeToggled}))

    render() {
        const {addRecipeToggled} = this.state

        return (
            <div className={'Recipes'}>
                <ActionBox
                    title={'Add recipe'}
                    isOpen={addRecipeToggled}
                    toggle={this.toggleAddRecipe}
                >
                    <RecipeDetails />
                </ActionBox>

                {
                    this.props.data.map(recipe => {
                        <Recipe {...recipe} />
                    })
                }
            </div>
        );
    }
}