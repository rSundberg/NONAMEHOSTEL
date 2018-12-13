import React, { Component } from 'react'

import '../shared/css/categories.css'

export default class ActivityCategories extends Component {
    render() {
        const {categories, setCategory, activeCategory} = this.props
        return (
            <div className={`Categories`}>
                {categories.map(category =>
                    <div
                        key={category}
                        className={`Categories__category ${category === activeCategory ? 'Categories__category--active' : ''}`}
                        onClick={() => setCategory(category)}>
                        {category}
                    </div>
                )}
            </div>
        )
    }
}