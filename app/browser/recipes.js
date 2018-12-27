import React, { Component } from 'react';

import ActionBox from './actionbox'

import '../shared/css/recipes.css'
import RecipeDetails from './recipedetails';

import Settings from '../shared/media/settings.svg'

class Recipe extends Component {
    state = {
        settingsToggled: false,
        recipeToggled: false
    }

    toggleSettings = () => this.setState(({settingsToggled}) => ({settingsToggled: !settingsToggled, recipeToggled: false}))

    toggleRecipe = () => this.setState(({ recipeToggled }) => ({ recipeToggled: !recipeToggled, settingsToggled: false}))

    render() {
        const {settingsToggled, recipeToggled} = this.state
        const { name, imageUrl, price, description, ingredients, instructions, active, activate, category, id, update } = this.props

        return (<div className={`Recipes__box`}>
            <div className={'Recipes__preview-wrapper'} onClick={this.toggleRecipe}>
                <img className={'Recipes__picture'} src={imageUrl} />

                <div className={'Recipes__preview-info'}>
                    <h2 className={'Recipes__title'}>{name}</h2>

                    <span className={'Recipes__description'}>{description}</span>

                    <div className={'Recipes__actions'}>
                        <Settings
                            className={`Recipes__settings ${settingsToggled ? 'Recipes__settings--active' : ''}`}
                            width={30}
                            onClick={e => {
                                e.stopPropagation()
                                this.toggleSettings()
                            }}
                        />

                        <div
                            className={`Recipes__activate ${active ? 'Recipes__activate--active' : ''}`}
                            onClick={e => {
                                e.stopPropagation()
                                activate(id, !active)
                            }}
                        >
                            {active ? 'Remove' : 'Add'}
                        </div>                        
                    </div>
                </div>
            </div>

            {recipeToggled
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
                </div>
                : null
            }

            {settingsToggled
                ? <RecipeDetails
                    preFill={true}
                    id={id}
                    name={name}
                    price={price}
                    description={description}
                    category={category}
                    ingredients={ingredients}
                    instructions={instructions}
                    imageUrl={imageUrl}
                    onConfirm={update}
                />
                : null
            }
        </div>)
    }
}

export default class Recipes extends Component {
    state = {
        addRecipeToggled: false,
        expandedRecipe: false,
        recipes: []
    }

    componentDidMount = () => {
        this.getRecipies().onSnapshot(snapshot => this.setState({ recipes: snapshot.docs }))
    }

    getRecipies = () => this.props.firestore.collection('recipes')

    addRecipe = (data, imageFile) => this.props.firestore.collection('recipes').add(data)
        .then(docRef => imageFile ? this.uploadRecipeImage(imageFile, docRef.id, docRef.path) : false)
        .then(() => {
            this.toggleAddRecipe()

            return true
        })

    deleteRecipe = id => this.props.firestore.collection('recipes').doc(id).delete()
        .then(() => this.props.storage.ref().child(`recipe_images/${id}`).delete())

    activeRecipe = (id, bool) => this.props.firestore.collection('recipes').doc(id).update({ active: bool })

    updateRecipe = (docRef) =>
        (data, imageFile) =>
            this.props.firestore.collection('recipes').doc(docRef.id).update(data)
                .then(() => imageFile ? this.uploadRecipeImage(imageFile, docRef.id, docRef.ref.path) : false)

    uploadRecipeImage = (file, id, path) => this.props.storage
        .ref()
        .child(`recipe_images/${id}`)
        .put(file)
        .then(snapshot => this.props.storage.ref().child(snapshot.ref.fullPath).getDownloadURL())
        .then(url => {
            this.props.firestore.doc(path).update({ imageUrl: url })
        })

    toggleAddRecipe = () => this.setState(({addRecipeToggled}) => ({addRecipeToggled: !addRecipeToggled}))

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
        const {addRecipeToggled, recipes} = this.state

        return (
            <div className={'Recipes'}>
                <ActionBox
                    title={'Add recipe'}
                    isOpen={addRecipeToggled}
                    toggle={this.toggleAddRecipe}
                >
                    <RecipeDetails onConfirm={this.addRecipe} />
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
                                            update={this.updateRecipe(doc)}
                                        />)
                                }
                            </div>
                        </div>)
                }
            </div>
        );
    }
}