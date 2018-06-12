import React, { Component } from 'react';

import Member from './member'

import '../shared/css/members.css'

import SearchIcon from '../shared/media/search.svg'

export default class Members extends Component {
    state = {
        searchResult: [],
        members: [],
        searched: false
    }

    searchRef = React.createRef()

    componentDidMount() {
        this.getMembers()
    }

    searchMember = () => {
        console.log(this.searchRef.current.value)
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

    render() {
        return (
            <div className={`Members`}>
                <div className={`Members__search`}>
                    <input
                        ref={this.searchRef}
                        className={'Members__input'}
                        type={'text'}
                        placeholder={'Member email'}
                    />

                    <SearchIcon onClick={this.searchMember}/>
                </div>
                {this.state.searchResult.length > 0
                    ? <h2 className={'Members__title'}>
                        Search result
                    </h2>
                    : this.state.searched
                        ? <h2 className={'Members__title'}>
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

                <h2 className={'Members__title'}>
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