import React, { Component } from 'react'

import '../shared/css/categories.css'

export default class ActivityCategories extends Component {
    render() {
        return (
            <div className={`Categories`}>
                {this.props.categories.map(category =>
                    <div
                        key={category}
                        className={`Categories__category ${category === this.props.activeCategory ? 'Categories__category--active' : ''}`}
                        onClick={() => this.props.setCategory(category)}>
                        {category}
                    </div>
                )}
            </div>
        )
    }
}