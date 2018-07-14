import React, { Component } from 'react';

import Member from './member'
import CompleteDetails from './completedetails'

import '../shared/css/members.css'

import AddIcon from '../shared/media/add.svg'
import SearchIcon from '../shared/media/search.svg'

export default class Members extends Component {
    state = {
        searchResult: [],
        members: [],
        searched: false,
        addMemberToggled: false
    }

    searchRef = React.createRef()

    componentDidMount() {
        this.getMembers()
    }

    searchMember = () => {
        const value = this.searchRef.current.value
        const search = this.props.firestore.collection('members').where('email', '==', value)

        search
            .get()
            .then(query => this.setState({
                searchResult: query.docs || [],
                searched: true
            }))
    }

    getMembers = () => {
        const members = this.props.firestore.collection('members').orderBy('created', 'desc').limit(3)

        members
            .get()
            .then(query =>
                this.setState({
                    members: query.docs || []
                })
            )
    }

    addMember = (detailObj = {}) => {
        const memberRef = this.props.firestore.collection('members')
        const created = {
            created: this.props.moment().format('YYYY-MM-DD')
        }

        memberRef
            .add({...detailObj, ...created})
            .then(docRef => {
                this.getMembers()
                this.toggleAddMember()
            })
    }

    toggleAddMember = () => this.setState({addMemberToggled: !this.state.addMemberToggled})

    render() {
        return (
            <div className={`Members`}>
                <div className={'App__action-box'}>
                    <span
                        onClick={this.toggleAddMember}
                        className={'Members__action-title'}>
                        Add member
                    </span>

                    <AddIcon
                        onClick={this.toggleAddMember}
                        className={'Members__icon'}
                    />

                    { this.state.addMemberToggled
                        ? <div className={'Members__action-details'}><CompleteDetails confirm={this.addMember}/></div>
                        : null
                    }
                </div>

                <div className={`App__action-box`}>
                    <input
                        ref={this.searchRef}
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Member email'}
                    />

                    <SearchIcon
                        className={'Members__icon'}
                        onClick={this.searchMember}
                    />

                </div>

                {this.state.searchResult.length > 0
                    ? <h2 className={'App__title'}>
                        Search result
                    </h2>
                    : this.state.searched
                        ? <h2 className={'App__title'}>
                            No member found
                        </h2>
                        : null
                }

                {this.state.searchResult.map(member => 
                    <Member
                        firestore={this.props.firestore}
                        storage={this.props.storage}
                        moment={this.props.moment}
                        doc={member}
                        key={member.id}
                    />
                )}

                <h2 className={'App__title'}>
                    Latest members
                </h2>

                {this.state.members.map(member =>
                    <Member
                        firestore={this.props.firestore}
                        storage={this.props.storage}
                        moment={this.props.moment}
                        doc={member}
                        key={member.id}
                    />
                )}
            </div>
        );
    }
}