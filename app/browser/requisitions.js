import React, { Component } from 'react'

import '../shared/css/requisitions.css'

import Categories from './categories'
import ActionBox from './actionbox'
import Requisition from './requisition'

import CheckIcon from '../shared/media/checkmark.svg'
import AddIcon from '../shared/media/add.svg'
import CancelIcon from '../shared/media/cancel.svg'

export default class Requisitions extends Component {
    state = {
        categories: ['kitchen', 'project', 'art', 'staff', 'general'],
        activeCategory: "",
        addRequisitionToggled: false,
        error: false,
        required: null,
        selectedRequisitions: [],
        requiredList: [],
        item: "",
        amount: "",
        price: ""
    }

    componentDidMount() {
        this.getRequisitions('required')
            .then(queryRef => this.setState({required: queryRef.docs}))
    }

    toggleAddRequisition = () => this.setState({
        addRequisitionToggled: !this.state.addRequisitionToggled,
        activeCategory: "",
        requiredList: [],
        error: false
    })

    setCategory = category => this.state.requiredList.length === 0
        ? this.setState({activeCategory: category})
        : null

    emptyValue = obj => Object.keys(obj).some(key => !!obj[key] === false)

    confirmClick = () => {
        let empty = this.state.requiredList.length === 0

        if (empty) {
            this.setState({ error: true })

            return
        }

        let requiredUploads = this.state.requiredList
            .map(data => this.uploadRequisition('required', data))

        Promise.all(requiredUploads)
            .then(docRefs => Promise.all(docRefs.map(doc => doc.get())))
            .then(docs => {
                console.log(docs)
                this.setState({
                    activeCategory: null,
                    addRequisitionToggled: false,
                    error: false,
                    required: this.state.required.concat(docs)
                })
            })
    }

    addClick = () => {
        let data = this.requiredData()

        if (this.emptyValue(data) || !this.state.activeCategory) {
            this.setState({ error: true })

            return
        }

        this.state.requiredList.push(data)

        this.setState({
            requiredList: this.state.requiredList,
            error: false,
            item: "",
            amount: "",
            price: ""
        })
    }

    uploadRequisition = (type, data) => this.props.firestore
        .collection('requisitions')
        .doc(type)
        .collection('data')
        .add(data)

    getRequisitions = type => this.props.firestore
        .collection('requisitions')
        .doc(type)
        .collection('data')
        .get()

    deleteRequisition = path => this.props.firestore.doc(path).delete()

    emptyRequiredList = () => this.setState({requiredList: []})

    requiredData = () => {
        return {
            category: this.state.activeCategory,
            created: this.props.moment().format('YYYY-MM-DD'),
            item: this.state.item,
            amount: this.state.amount,
            price: this.state.price
        }
    }

    listItem = ({item, amount, price}) => {
        return <div className={'Requisitions__list-item'}>
            <span>{item}</span>
            <span>{amount}</span>
            <span>{price}</span>
        </div>
    }

    sortByCategory = docs => {
        let categories = docs
            .map(doc => doc.data())
            .reduce((categories, {category}) => {
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

    toggleRequisition = (docRef, newPrice) => {
        if (this.isSelected(docRef)) {
            this.setState({ selectedRequisitions: this.state.selectedRequisitions.filter(({doc}) => doc.id !== docRef.id)})
        } else {
            let ref = {
                price: newPrice,
                doc: docRef
            }

            this.state.selectedRequisitions.push(ref)

            this.setState({ selectedRequisitions: this.state.selectedRequisitions})
        }
    }

    isSelected = docRef => this.state.selectedRequisitions.some(({doc}) => doc.id === docRef.id)

    confirmRequisitions = () => {
        let uploads = this.state.selectedRequisitions.map(({price, doc}) => {
            let {item, amount, category} = doc.data()
            let data = {
                created: this.props.moment().format('YYYY-MM-DD'),
                category: category,
                item: item,
                amount: amount,
                price: price
            }

            return this.uploadRequisition('bought', data)
        })

        return Promise.all(uploads)
            .then(docRefs => this.deleteRequisitions())
    }

    deleteRequisitions = () => {
        let deleted = this.state.selectedRequisitions.map(({ doc }) => {
            return this.deleteRequisition(doc.ref.path)
        })

        return Promise.all(deleted)
    }

    confirmRequisitionsClick = () => {
        this.confirmRequisitions()
            .then(docRefs => {
                this.clearRequisitions()
            })
    }

    deleteRequistionsClick = () => {
        this.deleteRequisitions()
            .then(docRefs => {
                this.clearRequisitions()
            })
    }

    clearRequisitions = () => {
        const {required, selectedRequisitions} = this.state

        let cleared = required
            .filter(docRef =>
                selectedRequisitions.some(({doc}) =>
                    doc.id !== docRef.id
            ))

        this.setState({
            required: cleared,
            selectedRequisitions: []
        })
    }

    render() {
        const { addRequisitionToggled, categories, required, activeCategory, requiredList, selectedRequisitions, item, amount, price, error} = this.state

        return (
            <div className={'Requisitions'}>
                <ActionBox
                    title={'Add requisition'}
                    isOpen={addRequisitionToggled === true}
                    toggle={this.toggleAddRequisition}
                >

                    <Categories
                        categories={categories}
                        setCategory={this.setCategory}
                        activeCategory={activeCategory}
                    />

                    <input
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Item'}
                        onChange={e => this.setState({ item: e.target.value })}
                        value={item}
                    />

                    <input
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Amount'}
                        onChange={e => this.setState({ amount: e.target.value })}
                        value={amount}
                    />

                    <input
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Price'}
                        onChange={e => this.setState({ price: e.target.value })}
                        value={price}
                    />

                    <div className={'Requisitions__options'}>
                        <div
                            className={'App__confirm'}
                            onClick={this.confirmClick}
                        >
                            <CheckIcon />
                        </div>

                        <AddIcon
                            width={'100%'}
                            height={40}
                            onClick={this.addClick}
                        />
                    </div>

                    {requiredList.length > 0
                        ? <div className={'Requisitions__list'}>
                            <div className={'Requisitions__options'}>
                                <h2 className={'Requisitions__list-category'}>
                                    {activeCategory}
                                </h2>

                                <AddIcon
                                    style={{ transform: 'rotate(45deg)' }}
                                    width={'100%'}
                                    height={20}
                                    onClick={this.emptyRequiredList}
                                />
                            </div>

                            <div className={'Requisitions__list-item'}>
                                <span className={'Requisitions__list-title'}>
                                    Item
                                </span>

                                <span className={'Requisitions__list-title'}>
                                    Amount
                                </span>

                                <span className={'Requisitions__list-title'}>
                                    Price
                                </span>
                            </div>

                            {requiredList.map(this.listItem)}
                        </div>
                        : null
                    }
                </ActionBox>

                {error
                    ? <div className={'Requisitions__error-box'}>
                        You forgot some info for your requisition!
                    </div>
                    : null
                }
    
                {required
                    ? this.sortByCategory(required).map(({category, docs}) =>
                        <div className={'Requisitions__category-box'} key={category}>
                            <h2 className={'App__title'}>{category}</h2>

                            <div className={'Requisition'}>
                                <span className={'Requisition__title'}>Item</span>
                                <span className={'Requisition__title'}>Amount</span>
                                <span className={'Requisition__title'}>Price</span>
                            </div>

                            {docs.map(doc => <Requisition
                                doc={doc}
                                selected={this.isSelected(doc) === true}
                                toggle={this.toggleRequisition}
                                upload={this.uploadRequisition}
                                delete={this.deleteRequisition}
                                key={doc.id}
                            />)
                            }
                        </div>
                    )
                    : null
                }

                {selectedRequisitions.length > 0
                    ? <div className={'Requisitions__actions'}>
                        <div
                            className={'Requisitions__actions-item'}
                            onClick={this.deleteRequisitionsClick}
                        >
                            <CancelIcon width={20} height={20} />
                            <span>Delete</span>
                        </div>

                        <div
                            className={'Requisitions__actions-item'}
                            onClick={this.confirmRequisitionsClick}
                        >
                            <CheckIcon width={20} height={20} />
                            <span>Confirm</span>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}