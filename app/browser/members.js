import React, { Component } from 'react';

import Member from './member'
import CompleteDetails from './completedetails'
import ActionBox from './actionbox'
import Loader from './loader'
import PictureInput from './pictureinput'

import '../shared/css/members.css'

import SearchIcon from '../shared/media/search.svg'

export default class Members extends Component {
    state = {
        searchResult: [],
        members: [],
        searched: false,
        addMemberToggled: false,
        loading: false,
        loadingMembers: false
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

        this.setState({members: [], loadingMembers: true})

        // members
        //     .get()
        //     .then(query =>
        //         this.setState({
        //             members: query.docs || [],
        //             loadingMembers: false
        //         })
        //     )

        members.onSnapshot(({docs}) => {
            this.setState({
                loadingMembers: false,
                members: docs
            })
        })
    }

    addMember = (detailObj = {}) => {
        const memberRef = this.props.firestore.collection('members')
        const created = {
            created: this.props.moment().format('YYYY-MM-DD')
        }

        this.setState({loading: true})

        memberRef
            .add({...detailObj, ...created})
            .then(docRef => {
                this.uploadPicture(docRef)
                    .then(doc => {
                        this.setState({loading: false})

                        this.toggleAddMember()
                    })
            })
    }

    uploadPicture = docRef => {
        const pictureRef = this.props.storage.ref()

        return pictureRef
            .child(`profile_pictures/${docRef.id}`)
            .put(this.state.uploadBlob)
            .then(snapshot => pictureRef
                .child(snapshot.ref.fullPath)
                .getDownloadURL()
            )
            .then(url => this.props.firestore
                .doc(docRef.path)
                .update({ imageUrl: url })
            )
            .catch(err => console.log(err))
    }

    toggleAddMember = () => this.setState({addMemberToggled: !this.state.addMemberToggled})

    render() {
        const { addMemberToggled, loading, loadingMembers, searchResult, searched, members, uploadBlob} = this.state

        return (
            <div className={`Members`}>
                <ActionBox
                    title={'Add member'}
                    toggle={this.toggleAddMember}
                    isOpen={addMemberToggled === true}
                >
                    <div className={'Members__add-wrapper'}>
                        <PictureInput
                            blob={blob => this.setState({uploadBlob: blob})}
                            preview={uploadBlob}
                        />

                        <CompleteDetails
                            confirm={this.addMember}
                            loading={loading === true}
                        />    
                    </div>
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
                <div className={'Members__member-wrapper'}>
                    {searchResult.map(doc => 
                        <Member
                            firestore={this.props.firestore}
                            storage={this.props.storage}
                            moment={this.props.moment}
                            doc={doc}
                            key={doc.id}
                        />
                    )}
                </div>

                <h2
                    className={'App__title'}
                    onClick={() => this.getMembers()}
                >
                    Latest members
                </h2>

                {loadingMembers
                    ? <Loader pastDelay={true} height={40} />
                    : null
                }

                <div className={'Members__member-wrapper'}>
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
            </div>
        );
    }
}