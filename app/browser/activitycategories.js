import React, { Component } from 'react'

import '../shared/css/activitycategories.css'

export default class ActivityCategories extends Component {
    render() {
        console.log(this.props)
        return (
            <div className={`ActivityCategories`}>
                {this.props.categories.map(category =>
                    <div
                        key={category}
                        className={`ActivityCategories__category ${category === this.props.activeCategory ? 'ActivityCategories__category--active' : ''}`}
                        onClick={() => this.props.setCategory(category)}>
                        {category}
                    </div>
                )}
            </div>
        )
    }
}