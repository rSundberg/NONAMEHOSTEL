import React, { Component } from 'react';

import ActionBox from './actionbox'

import '../shared/css/recipes.css'
import RecipeDetails from './recipedetails';

function Recipe({name, imageUrl, price, description, ingredients, instructions, active, activate, remove, id, expand, expanded}) {
    return <div
        className={`Recipes__box`}
        onClick={() => expand(id)}
    >
        <div className={'Recipes__preview-wrapper'}>
            <img className={'Recipes__picture'} src={imageUrl} />

            <div className={'Recipes__preview-info'}>
                <h2 className={'Recipes__title'}>{name}</h2>

                <span className={'Recipes__description'}>{description}</span>
            </div>
        </div>

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

export default class Recipes extends Component {
    state = {
        addRecipeToggled: false,
        expandedRecipe: false,
        recipes: []
    }

    componentDidMount = () => {
        this.getRecipies().then((snapshot) => this.setState({ recipes: snapshot.docs }))
    }

    getRecipies = () => this.props.firestore.collection('recipes').get()

    addRecipe = (data, image) =>
        this.props.firestore.collection('recipes').add(data)
            .then(docRef =>
                this.uploadRecipeImage(image, docRef)
                    .then(url => this.props.firestore.doc(docRef.path).update({ imageUrl: url }))    
                    .then(() => this.props.firestore.collection('recipes').doc(docRef.id).get())
                    .then(doc => {
                        this.setState(({ recipes }) => {
                            recipes.push(doc)

                            return ({ recipes: recipes })
                        })

                        return true
                    })
            )

    deleteRecipe = id => this.props.firestore.collection('recipes').doc(id).delete()
        .then(() => this.props.storage.ref().child(`recipe_images/${id}`).delete())
        .then(() => this.setState(({ recipes }) => ({ recipes: recipes.filter(recipe => recipe.id !== id) })))

    activeRecipe = (id, bool) => this.props.firestore.collection('recipes').doc(id).update({ active: bool })
        .then(() => this.props.firestore.collection('recipes').doc(id).get())
        .then(doc => {
            this.setState(({ recipes }) => {
                let withoutOldDoc = recipes.filter(recipe => recipe.id !== id)

                withoutOldDoc.push(doc)

                return ({ recipes: withoutOldDoc })
            })
        })

    uploadRecipeImage = (file, docRef) => this.props.storage
        .ref()
        .child(`recipe_images/${docRef.id}`)
        .put(file)
        .then(snapshot => this.props.storage.ref().child(snapshot.ref.fullPath).getDownloadURL())

    toggleAddRecipe = () => this.setState(({addRecipeToggled}) => ({addRecipeToggled: !addRecipeToggled}))

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
        const {addRecipeToggled, expandedRecipe, recipes} = this.state

        return (
            <div className={'Recipes'}>
                <ActionBox
                    title={'Add recipe'}
                    isOpen={addRecipeToggled}
                    toggle={this.toggleAddRecipe}
                >
                    <RecipeDetails
                        onConfirm={this.addRecipe}
                        toggleBox={this.toggleAddRecipe}
                    />
                </ActionBox>

                {
                    this.sortByCategory(recipes)
                        .map(({category, docs}) => <div>
                            <h2 className={'Recipes__category'}>{category}</h2>

                            <div className={'Recipes__wrapper'}>
                                {
                                    docs.sort(this.byName)
                                        .map(doc => <Recipe {...doc.data()}
                                            id={doc.id}
                                            expand={this.expandRecipe}
                                            expanded={expandedRecipe === doc.id}
                                            activate={this.activeRecipe}
                                            remove={this.deleteRecipe}
                                        />)
                                }
                            </div>
                        </div>)
                }
            </div>
        );
    }
}