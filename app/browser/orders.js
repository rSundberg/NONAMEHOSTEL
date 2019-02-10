import React, { Component, Fragment } from 'react'

import ActionBox from './actionbox'
import Categories from './categories'
import Order from './order'
import AddIcon from '../shared/media/add.svg'

import '../shared/css/orders.css'

export default class Orders extends Component {
    state = {
        addOrderToggled: false,
        name: '',
        items: [],
        order: [],
        category: null,
        paid: false,
        served: false,
        loading: false,
        orders: [],
        unpaidOrders: [],
        paidOrders: []
    }

    componentDidMount() {
        this.getActiveItems().then(querySnapshot => this.setState({items: querySnapshot.docs}))

        this.getOrders().onSnapshot(querySnapshot => this.setState({orders: querySnapshot.docs}))

        this.getUnpaidOrders().onSnapshot(querySnapshot => this.setState({unpaidOrders: querySnapshot.docs}))

        this.getPaidOrders().onSnapshot(querySnapshot => this.setState({paidOrders: querySnapshot.docs}))
    }

    toggleAddOrder = () => this.setState(({addOrderToggled}) => ({addOrderToggled: !addOrderToggled}))

    getActiveItems = () => this.props.firestore.collection('recipes')
        .where('active', '==', true).get()

    getOrders = () => this.props.firestore.collection('orders')
        .where('served', '==', false)
        .where('order_time', '>=', this.props.moment().startOf('day').unix())

    getUnpaidOrders = () => this.props.firestore.collection('orders')
        .where('paid', '==', false)
        .where('served', '==', true)
    
    getPaidOrders = () => this.props.firestore.collection('orders')
        .where('served', '==', true)
        .where('paid', '==', true)
        .where('order_time', '>=', this.props.moment().startOf('day').unix())
        .orderBy('order_time', 'desc')

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

    removeOrder = id => this.setState(({order}) => ({
            order: order.filter(value => value.id !== id)
        }))
    
    deleteOrder = id => this.props.firestore.collection('orders').doc(id).delete()

    confirmOrder = order => {
        const {name, paid, served} = this.state

        if (order.length > 0 && name) {
            this.setState({error: false, loading: true})

            const data = {
                order_time: this.props.moment().unix(),
                name: name,
                items: order,
                served: false,
                paid: paid,
                served: served
            }
    
            const dbRef = this.props.firestore.collection('orders')
    
            dbRef.add(data)
                .then(() => this.setState({
                    addOrderToggled: false,
                    name: '',
                    order: [],
                    category: null,
                    paid: false,
                    served: false,
                    loading: false
                }))
        } else {
            this.setState({error: true})
        }
    }

    updateOrderPaymentStatus = (id, data) => this.props.firestore.collection('orders').doc(id)
        .update(Object.assign({
            order_time: this.props.moment().unix()
        }, data))

    updateActiveCategory = category => this.setState({category: category})

    updateName = e => this.setState({name: e.target.value})

    serveNow = () => this.setState(({ served }) => ({ served: !served }))

    payNow = () => this.setState(({paid}) => ({paid: !paid}))

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
        const {name, paid, served, addOrderToggled, items, category, order, loading, orders, unpaidOrders, paidOrders, error} = this.state

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
                                        key={item.id}
                                        className={`Orders__box`}
                                        onClick={() => this.addToOrder(item)}
                                    >
                                        <h2 className={'Orders__title'}>{name}</h2>
                                        <span className={'Orders__price'}>{price}</span>
                                    </div>
                                })
                            : null
                        }
                    </div>
                    
                    { order.length > 0
                        ? <div className={'Orders__summary-wrapper'}>
                            {
                                this.getSummary(order).map(({ id, name, quantity, price }) =>
                                    <div className={'Orders__summary'} key={id}>
                                        <AddIcon
                                            width={20}
                                            className={'Orders__remove'}
                                            onClick={() => this.removeOrder(id)}
                                        />

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

                            <div className={'Orders__total-wrapper'}>
                                <div className={'Orders__total-actions'}>
                                    <span
                                        className={`Orders__total-action ${paid ? 'Orders__total-action--confirmed' : ''}`}
                                        onClick={this.payNow}
                                    >
                                        Pay now
                                    </span>

                                    <span
                                        className={`Orders__total-action ${served ? 'Orders__total-action--confirmed' : ''}`}
                                        onClick={this.serveNow}
                                    >
                                        Serve now
                                    </span>
                                </div>

                                <div className={'Orders__total'}>
                                    <h2 className={'Orders__title'}>Total</h2>

                                    <span>{this.getTotalPrice(order)}</span>
                                </div>

                            </div>

                            <div className={'Orders__name'}>
                                <input
                                    className={'App__input'}
                                    type={'text'}
                                    placeholder={'Name'}
                                    onChange={this.updateName}
                                    value={name}
                                />
                            </div>

                            <div
                                className={`Orders__confirm ${loading ? 'App__loading' : ''}`}
                                onClick={() => this.confirmOrder(this.getSummary(order))}
                            >
                                Confirm order
                            </div>

                            {error
                                ? <div className={'Orders__error'}>
                                    Don't forget any fields!
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                </ActionBox>

                <h2 className={'App__title'}>Recent orders</h2>
                
                <div className={'Orders__ticket-wrapper'}>
                    {
                        orders.map(order =>
                            <Order
                                key={order.id}
                                {...order.data()}
                                id={order.id}
                                payAction={this.updateOrderPaymentStatus}
                                deleteAction={this.deleteOrder}
                            />)
                    }
                </div>

                <h2 className={'App__title'}>Unpaid orders</h2>

                <div className={'Orders__ticket-wrapper'}>
                    {
                        unpaidOrders.map(order =>
                            <Order
                                key={order.id}
                                {...order.data()}
                                id={order.id}
                                payAction={this.updateOrderPaymentStatus}
                            />)
                    }
                </div>

                <h2 className={'App__title'}>Paid orders</h2>

                <div className={'Orders__ticket-wrapper'}>
                    {
                        paidOrders.map(order =>
                            <Order
                                key={order.id}
                                {...order.data()}
                                id={order.id}
                                payAction={this.updateOrderPaymentStatus}
                            />)
                    }
                </div>
            </div>
        );
    }
}