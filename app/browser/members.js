import React, { Component } from 'react';

import Member from './member'
import CompleteDetails from './completedetails'
import ActionBox from './actionbox'

import '../shared/css/members.css'

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

        this.setState({loading: true})

        memberRef
            .add({...detailObj, ...created})
            .then(docRef => docRef.get())
            .then(doc => {
                this.setState(({members}) => {
                    return {
                        members: members.concat(doc),
                        loading: false
                    }
                })

                this.toggleAddMember()
            })
    }

    toggleAddMember = () => this.setState({addMemberToggled: !this.state.addMemberToggled})

    render() {
        const { addMemberToggled, loading, searchResult, searched, members} = this.state

        return (
            <div className={`Members`}>
                <ActionBox
                    title={'Add member'}
                    toggle={this.toggleAddMember}
                    isOpen={addMemberToggled === true}
                >
                    <CompleteDetails
                        confirm={this.addMember}
                        loading={loading === true}
                    />
                </ActionBox>

                <h2
                    className={'App__title'}
                    onClick={this.searchMember}>
                    Search
                </h2>

                <div className={`App__action-box`}>
                    <input
                        ref={this.searchRef}
                        className={'App__input'}
                        type={'text'}
                        placeholder={'Member email'}
                    />
                </div>

                {searchResult.length > 0
                    ? <h2 className={'App__title'}>
                        Search result
                    </h2>
                    : searched
                        ? <h2 className={'App__title'}>
                            No member found
                        </h2>
                        : null
                }

                {searchResult.map(doc => 
                    <Member
                        firestore={this.props.firestore}
                        storage={this.props.storage}
                        moment={this.props.moment}
                        doc={doc}
                        key={doc.id}
                    />
                )}

                <h2 className={'App__title'}>
                    Latest members
                </h2>

                {members.map(doc =>
                    <Member
                        firestore={this.props.firestore}
                        storage={this.props.storage}
                        moment={this.props.moment}
                        doc={doc}
                        key={doc.id}
                    />
                )}
            </div>
        );
    }
}