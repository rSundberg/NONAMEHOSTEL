import React, { Component, Fragment } from 'react';
import Anime from 'animejs'

import Categories from './categories'
import ListMaker from './listmaker'
import PictureInput from './pictureinput'

import '../shared/css/recipedetails.css'

export default class RecipeDetails extends Component {
    state = {
        uploadBlob: null,
        categories: ['drink', 'food', 'dessert', 'snack'],
        category: '',
        name: '',
        price: '',
        ingredient: '',
        ingredients: [],
        instruction: '',
        instructions: [],
        loading: false
    }

    descriptionRef = React.createRef()

    addIngredient = () => {
        this.setState(({ingredients, ingredient}) => {
            if (ingredient) {
                ingredients.push(ingredient)

                return ({ingredients: ingredients, ingredient: ''})
            }
        })
    }

    deleteIngredient = value => this.setState(({ ingredients }) => ({
        ingredients: ingredients.filter(ingredient => ingredient !== value)
    }))

    addInstruction = () => {
        this.setState(({ instructions, instruction }) => {
            if (instruction) {
                instructions.push(instruction)

                return ({ instructions: instructions, instruction: '' })
            }
        })
    }

    deleteInstruction = value => this.setState(({ instructions }) => ({
        instructions: instructions.filter(instruction => instruction !== value)
    }))

    updateInfo = (key, data) => this.setState({[key]: data})

    autoResizeDescription = e => {
        let elementHeight = this.descriptionRef.current.offsetHeight
        let scrollHeight = e.target.scrollHeight + 2 // 2 px difference compared to scrollheight

        if (elementHeight !== scrollHeight) {
            Anime({
                targets: this.descriptionRef.current,
                height: e.target.scrollHeight,
                duration: 0,
                easing: 'easeOutQuad'
            })
        }

        this.updateInfo('description', e.target.value)
    }

    confirmRecipe = () => {
        this.setState({error: false, loading: true})

        const {name, price, description, category, ingredients, instructions, uploadBlob} = this.state

        const data = {
            name: name,
            price: price,
            description: description,
            category: category,
            ingredients: ingredients,
            instructions: instructions,
            active: false
        }

        if (name && price && description && category && ingredients.length > 0 && instructions.length > 0 && uploadBlob) {
            this.props.onConfirm(data, uploadBlob).then(() => this.setState({loading: false}, this.props.toggleBox))
        } else {
            this.setState({error: true, loading: false})
        }

    }

    render() {
        const {uploadBlob, name, price, description, ingredient, instruction, categories, category, ingredients, instructions, loading, error} = this.state

        return (
            <Fragment>
                <PictureInput
                    blob={blob => this.setState({uploadBlob: blob})}
                    preview={uploadBlob}
                />

                <div>
                    <input
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Name'}
                        onChange={e => this.updateInfo('name', e.target.value)}
                        value={name}
                    />
                </div>

                <div>
                    <input
                        className={'App__input'}
                        type={'number'}
                        placeholder={'Price'}
                        onChange={e => this.updateInfo('price', parseInt(e.target.value))}
                        value={price}
                    />
                </div>
                
                <div>
                    <textarea
                        className={'RecipeDetails__description'}
                        placeholder={'Description'}
                        ref={this.descriptionRef}
                        onChange={this.autoResizeDescription}
                        value={description}
                    ></textarea>
                </div>

                <Categories
                    categories={categories}
                    setCategory={category => this.updateInfo('category', category)}
                    activeCategory={category}
                />

                <ListMaker
                    title={'Ingredients'}
                    onInputValueChange={e => this.updateInfo('ingredient', e.target.value)}
                    currentInputValue={ingredient}
                    addInputValue={this.addIngredient}
                    currentList={ingredients}
                    deleteListItem={this.deleteIngredient}
                />

                <ListMaker
                    title={'Instructions'}
                    onInputValueChange={e => this.updateInfo('instruction', e.target.value)}
                    currentInputValue={instruction}
                    addInputValue={this.addInstruction}
                    currentList={instructions}
                    deleteListItem={this.deleteInstruction}
                />

                <div className={`RecipeDetails__confirm ${loading ? 'App__loading' : ''}`} onClick={this.confirmRecipe}>
                    Confirm recipe
                </div>

                {error
                    ? <div className={'RecipeDetails__error'}>
                        Don't forget any fields!
                    </div>
                    : null
                }
            </Fragment>
        );
    }
}