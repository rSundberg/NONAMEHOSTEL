import React, { Component, Fragment } from 'react';

import Categories from './categories'

import '../shared/css/recipedetails.css'

export default class RecipeDetails extends Component {
    state = {
        categories: ['drink', 'food', 'dessert'],
        selectedCategory: null,
        activeIngredient: '',
        ingredients: []
    }

    setCategory = category => this.setState({selectedCategory: category})

    updateActiveIngredient = event => {
        console.log(event.target.value)
        this.setState({activeIngredient: event.target.value})
    }

    addIngredient = () => {
        console.log(this.state.activeIngredient)
        this.setState(({ingredients}) => {
            ingredients.push(this.state.activeIngredient)

            return ({ingredients: ingredients})
        })
    }

    render() {
        const {categories, selectedCategory, ingredients} = this.state

        return (
            <Fragment>
                <input type={'text'} placeholder={'Name'} />

                <input type={'text'} placeholder={'Price'} />

                <Categories
                    categories={categories}
                    setCategory={this.setCategory}
                    activeCategory={selectedCategory}
                />

                <div className={'RecipeDetails__ingredients'}>
                    <input type={'text'} placeholder={'Ingredient'} onChange={this.updateActiveIngredient}/>

                    <span onClick={this.addIngredient}>Add Ingredient</span>

                    {
                        ingredients.map(ingredient => 
                            <span>
                                {ingredient}
                            </span>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}