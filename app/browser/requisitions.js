import React, { Component, Fragment } from 'react'

import '../shared/css/requisitions.css'

import Categories from './categories'
import ActionBox from './actionbox'
import Requisition from './requisition'

import CheckIcon from '../shared/media/checkmark.svg'
import AddIcon from '../shared/media/add.svg'

export default class Requisitions extends Component {
    state = {
        categories: ['kitchen', 'project', 'art', 'staff', 'general'],
        activeCategory: "",
        addRequisitionToggled: false,
        error: false,
        required: null,
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

        let data = {
            category: this.state.activeCategory,
            created: this.props.moment().format('YYYY-MM-DD'),
            items: this.state.requiredList
        }

        this.uploadRequisition('required', data)
            .then(docRef => {
                this.setState({
                    activeCategory: null,
                    addRequisitionToggled: false,
                    error: false
                })
            })
    }

    addClick = () => {
        let data = this.requiredData()
        console.log('clicking')
        if (this.emptyValue(data) || !this.state.activeCategory) {
            this.setState({ error: true })
            console.log('returning')
            return
        }

        this.state.requiredList.push(data)

        console.log(this.state.requiredList)
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

    render() {
        const { addRequisitionToggled, categories, required, activeCategory, requiredList, item, amount, price, error} = this.state

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

                <h2 className={'App__title'}>
                    Required
                </h2>

                <Fragment>
                    {required
                        ? required.map(doc =>
                            <Requisition
                                doc={doc}
                                upload={this.uploadRequisition}
                                delete={this.deleteRequisition}
                                key={doc.id}
                            />
                        )
                        : null
                    }
                </Fragment>
            </div>
        )
    }
}