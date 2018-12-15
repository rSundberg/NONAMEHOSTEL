import React, { Component } from 'react';

import ActionBox from './actionbox'

import '../shared/css/recipes.css'
import RecipeDetails from './recipedetails';

function Recipe({name, price, description, ingredients, instructions, active, activate, remove, id, expand, expanded}) {
    return <div
        className={`Recipes__box`}
        onClick={() => expand(id)}
    >
        <h2 className={'Recipes__title'}>{name}</h2>
        <span className={'Recipes__description'}>{description}</span>

        { expanded
            ? <div className={'Recipes__details'}>
                <div className={'Recipes__list-wrapper'}>
                    <h2 className={'Recipes__title'}>Ingredients</h2>

                    <div className={'Recipes__list'}>
                        {   
                            ingredients.map(ingredient => <span className={'Recipes__description'}>
                                {ingredient}
                            </span>)
                        }
                    </div>
                </div>

                <div className={'Recipes__list-wrapper'}>
                    <h2 className={'Recipes__title'}>Instructions</h2>
                    
                    <div className={'Recipes__list'}>
                        {
                            instructions.map(instruction => <span className={'Recipes__description'}>
                                {instruction}
                            </span>)
                        }
                    </div>
                </div>

                {console.log(active)}

                <div className={'Recipes__actions'}>
                    <div
                        className={`Recipes__action ${active ? 'Recipes__action--active' : ''}`}
                        onClick={() => activate(id, !active)}
                    >
                        {active ? 'Deactivate' : 'Activate'}
                    </div>
                    
                    <div
                        className={'Recipes__action Recipes__action--active'}
                        onClick={() => remove(id)}
                    >
                        Remove
                    </div>
                </div>
            </div>
            : null
        }
    </div>
}

export default class Recipies extends Component {
    state = {
        addRecipeToggled: false,
        expandedRecipe: false
    }

    toggleAddRecipe = () => this.setState(({addRecipeToggled}) => ({addRecipeToggled: !addRecipeToggled}))

    getDataAndAddRecipe = data => this.props.addRecipe(data)

    expandRecipe = id => this.setState({expandedRecipe: id})

    sortByCategory = docs => {
        let categories = docs
            .map(doc => doc.data())
            .reduce((categories, { category }) => {
                if (!categories.includes(category)) {
                    categories.push(category)
                }

                return categories
            }, [])
            .sort()

        let sortedCategories = categories.reduce((categoryArray, category) => {
            let docsPerCategory = docs.filter(doc => doc.data().category === category)

            let categoryObj = {
                category: category,
                docs: docsPerCategory
            }

            categoryArray.push(categoryObj)

            return categoryArray
        }, [])

        return sortedCategories
    }

    byName = (a, b) => {
        let nameA = a.data().name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.data().name.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
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

                {
                    this.sortByCategory(this.props.data)
                        .map(({category, docs}) => <div>
                            <h2 className={'Recipes__category'}>{category}</h2>

                            <div className={'Recipes__wrapper'}>
                                {
                                    docs.sort(this.byName)
                                        .map(doc => <Recipe {...doc.data()}
                                            id={doc.id}
                                            expand={this.expandRecipe}
                                            expanded={expandedRecipe === doc.id}
                                            activate={this.props.activeRecipe}
                                            remove={this.props.deleteRecipe}
                                        />)
                                }
                            </div>
                        </div>)
                }
            </div>
        );
    }
}