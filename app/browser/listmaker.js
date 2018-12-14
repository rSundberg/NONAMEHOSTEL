import React, { Component } from 'react';

import AddIcon from '../shared/media/add.svg'

import '../shared/css/listmaker.css'

export default class ListMaker extends Component {
    render() {
        const {title, onInputValueChange, currentInputValue, addInputValue, currentList, deleteListItem} = this.props

        return (
            <div className={'ListMaker__wrapper'}>
                <div className={'ListMaker__input-wrapper'}>
                    <input
                        className={'App__input'}
                        type={'text'}
                        placeholder={title}
                        onChange={onInputValueChange}
                        value={currentInputValue}
                    />

                    <span onClick={addInputValue} className={'ListMaker__add-button'}>Add</span>
                </div>

                {currentList.length > 0
                    ? <div className={'ListMaker__values'}>
                        {
                            currentList.map(value =>
                                <div key={value} className={'ListMaker__value'}>
                                    <span>
                                        {value}
                                    </span>

                                    <AddIcon width={20} rotate={45} onClick={() => deleteListItem(value)} />
                                </div>
                            )
                        }
                    </div>
                    : null
                }
            </div>
        );
    }
}