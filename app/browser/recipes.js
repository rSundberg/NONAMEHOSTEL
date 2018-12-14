import React, { Component } from 'react';

import ActionBox from './actionbox'

import '../shared/css/recipes.css'
import RecipeDetails from './recipedetails';

function Recipe({name, price, description, ingredients, instructions, index, id, expand, expanded}) {
    return <div
        className={`Recipes__box ${expanded ? 'Recipes__box--expanded' : ''}`}
        onClick={() => expand(index, id)}
        style={expanded ? {
            'grid-row': `${index % 2 === 0 ? index / 2 : index - 1}`
        } : {}}
    >
        <h2 className={'Recipes__title'}>{name}</h2>
        <span className={'Recipes__price'}>{price}</span>
        <span className={'Recipes__description'}>{description}</span>
    </div>
}

export default class Recipies extends Component {
    state = {
        addRecipeToggled: false,
        expandedRecipe: false
    }

    toggleAddRecipe = () => this.setState(({addRecipeToggled}) => ({addRecipeToggled: !addRecipeToggled}))

    getDataAndAddRecipe = data => this.props.addRecipe(data)

    expandRecipe = (index, id) => {
        console.log(index)
        console.log(index % 2 === 0)
        this.setState({expandedRecipe: id})
    }

    render() {
        const {addRecipeToggled, expandedRecipe} = this.state

        return (
            <div className={'Recipes'}>
                <ActionBox
                    title={'Add recipe'}
                    isOpen={addRecipeToggled}
                    toggle={this.toggleAddRecipe}
                >
                    <RecipeDetails onConfirm={this.getDataAndAddRecipe} toggleBox={this.toggleAddRecipe} />
                </ActionBox>

                <div className={'Recipes__wrapper'}>
                    {
                        this.props.data.map((recipe, i) => {
                            return <Recipe {...recipe.data()} id={recipe.id} index={i + 1} expand={this.expandRecipe} expanded={expandedRecipe === recipe.id} />
                        })
                    }
                </div>
            </div>
        );
    }
}