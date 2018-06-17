import React, { Component } from 'react'

import CompleteDetails from './completedetails'

import '../shared/css/member.css'

import Upload from '../shared/media/upload_profile_picture.svg'
import Settings from '../shared/media/settings.svg'

export default class Member extends Component {
    state = {
        uploadedImgUrl: null,
        uploadedDocData: null,
        settingToggled: false
    }

    pictureInput = React.createRef()

    triggerUpload = () => this.pictureInput.current.click()
    
    uploadPicture = () => {
        const pictureRef = this.props.storage.ref()
        const file = this.pictureInput.current.files[0]

        pictureRef
            .child(`profile_pictures/${this.props.doc.id}`)
            .put(file)
            .then(snapshot => pictureRef.child(snapshot.ref.fullPath).getDownloadURL())
            .then(url => {
                this.setState({ uploadedImgUrl: url })

                return this.props.firestore.doc(this.props.doc.ref.path).update({imageUrl: url})
            })
            .then(() => {
                console.log('yay')
            })
            .catch(err => console.log(err))
    }

    loadPicture = () => {
        console.log('loading')
    }

    toggleSettings = () => this.setState({settingToggled: !this.state.settingToggled})

    updateDetails = (detailObj = {}) => {
        console.log(this.props.doc.ref.path)
        console.log(detailObj)
        const memberRef = this.props.firestore.doc(this.props.doc.ref.path)

        memberRef
            .update(detailObj)
            .then(() => this.setState({
                uploadedDocData: { ...this.props.doc.data(), ...detailObj}
            }, this.toggleSettings))
    }

    getDocData = () => this.state.uploadedDocData
        ? this.state.uploadedDocData
        : this.props.doc.data()

    render() {
        const {name, email, phone, country, created, imageUrl, birthdate, address} = this.getDocData()
        const {uploadedImgUrl, settingToggled} = this.state

        return (
            <div className={'Member'}>
                <div className={'Member__picture-wrapper'} onClick={this.triggerUpload}>
                    {!uploadedImgUrl && !imageUrl
                        ? <Upload />
                        : null
                    }

                    <img
                        onLoad={this.loadPicture}
                        className={'Member__picture'}
                        src={uploadedImgUrl || imageUrl}
                    />

                    <input
                        className={'Member__input'}
                        onChange={this.uploadPicture}
                        ref={this.pictureInput}
                        type="file"
                        capture="camera"
                        accept="image/*" />
                </div>

                {!settingToggled
                    ? <div className={'Member__info-wrapper'}>
                        <div className={'Member__info'}>
                            {name}
                        </div>
                        
                        <div className={'Member__info'}>
                            {email}
                        </div>

                        <div className={'Member__info'}>
                            {phone}
                        </div>

                        <div className={'Member__info'}>
                            {country}
                        </div>

                        <div className={'Member__info'}>
                            {birthdate}
                        </div>

                        <div className={'Member__info'}>
                            {address}
                        </div>

                        <div className={'Member__info'}>
                            {this.props.moment(created).format('DD MMM YYYY')}
                        </div>
                    </div>
                    : <CompleteDetails
                        name={name}
                        email={email}
                        phone={phone}
                        country={country}
                        birthdate={birthdate}
                        address={address}
                        confirm={this.updateDetails}
                    />
                }


                <Settings
                    className={'Member__settings'}
                    onClick={() => this.toggleSettings()}
                />
            </div>
        );
    }
}