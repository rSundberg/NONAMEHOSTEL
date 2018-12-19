import React, { Component } from 'react'

import ActionBox from './actionbox'
import Categories from './categories'

import '../shared/css/orders.css'
import { SIGABRT } from 'constants';

export default class Orders extends Component {
    state = {
        addOrderToggled: false,
        items: [],
        order: [],
        category: null
    }

    componentDidMount() {
        this.getActiveItems().then(querySnapshot => this.setState({items: querySnapshot.docs}))
    }

    toggleAddOrder = () => this.setState(({addOrderToggled}) => ({addOrderToggled: !addOrderToggled}))

    getActiveItems = () => this.props.firestore.collection('recipes').where('active', '==', true).get()

    getActiveCategories = () => this.state.items.reduce((categories, item) => {
        const {category} = item.data()

        if (!categories.includes(category)) {
            categories.push(category)
        }

        return categories
    }, [])

    addToOrder = item => this.setState(({order}) => {
        order.push(item)

        return ({order: order})
    })

    removeOrder = () => this.setState({order: []})

    updateActiveCategory = category => this.setState({category: category})

    getSummary = data => {
        return data.reduce((summary, item) => {
            const { name, price } = item.data()

            if (summary.find(summaryItem => summaryItem.id === item.id)) {
                return summary
                    .filter(summaryItem => summaryItem.id === item.id)
                    .map(summaryItem => Object.assign({}, {
                        id: item.id,
                        name: name,
                        price: parseInt(summaryItem.price) + parseInt(price),
                        quantity: summaryItem.quantity + 1
                    }))
                    .concat(summary.filter(summaryItem => summaryItem.id !== item.id))
            } else {
                summary.push({
                    id: item.id,
                    name: name,
                    price: price,
                    quantity: 1
                })

                return summary
            }

        }, [])
        .sort(this.byName)
    }

    getTotalPrice = data => this.getSummary(data).reduce((sum, { price }) => sum + price, 0)

    byName = (a, b) => {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase

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
        const {addOrderToggled, items, category, order} = this.state

        return (
            <div className={'Orders'}>
                <ActionBox
                    title={'Add Order'}
                    isOpen={addOrderToggled}
                    toggle={this.toggleAddOrder}
                >
                    <Categories
                        categories={this.getActiveCategories()}
                        setCategory={category => this.updateActiveCategory(category)}
                        activeCategory={category}
                    />

                    <div className={'Orders__box-wrapper'}>
                        { category
                            ? items
                                .filter(item => item.data().category === category)
                                .map(item => {
                                    const {name, price} = item.data()

                                    return <div
                                        className={`Orders__box`}
                                        onClick={() => this.addToOrder(item)}
                                    >
                                        <h2 className={'Orders__title'}>{name}</h2>
                                        <span className={'Orders__price'}>{price} rps</span>
                                    </div>
                                })
                            : null
                        }
                    </div>
                    
                    { order.length > 0
                        ? <div className={'Orders__summary-wrapper'}>
                            {
                                this.getSummary(order).map(({ name, quantity, price }) =>
                                    <div className={'Orders__summary'}>
                                        <h2 className={'Orders__title'}>
                                            {name}
                                        </h2>

                                        <span className={'Orders__price'}>
                                            {quantity}
                                        </span>

                                        <div>
                                            {price}
                                        </div>
                                    </div>
                                )
                            }

                            <div className={'Orders__total'}>
                                <span className={'Orders__remove'} onClick={this.removeOrder}>Delete</span>

                                <h2 className={'Orders__title'}>Total:</h2>

                                <span>{this.getTotalPrice(order)}</span>
                            </div>
                        </div>
                        : null
                    }

                </ActionBox>
            </div>
        );
    }
}