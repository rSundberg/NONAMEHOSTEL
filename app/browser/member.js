import React, { Component } from 'react'

import CompleteDetails from './completedetails'
import PictureInput from './pictureinput'

import '../shared/css/member.css'

import Upload from '../shared/media/upload_profile_picture.svg'
import Settings from '../shared/media/settings.svg'

export default class Member extends Component {
    state = {
        uploadedImgUrl: null,
        uploadedDocData: null,
        settingToggled: false,
        loading: false
    }

    pictureInput = React.createRef()

    triggerUpload = () => this.pictureInput.current.click()
    
    uploadPicture = file => {
        const pictureRef = this.props.storage.ref()

        this.setState({loading: true})

        pictureRef
            .child(`profile_pictures/${this.props.doc.id}`)
            .put(file)
            .then(snapshot => pictureRef.child(snapshot.ref.fullPath).getDownloadURL())
            .then(url => {
                this.setState({ uploadedImgUrl: url, loading: false })

                return this.props.firestore.doc(this.props.doc.ref.path).update({imageUrl: url})
            })
            .then(() => {
                console.log('yay')
            })
            .catch(err => console.log(err))
    }

    toggleSettings = () => this.setState({settingToggled: !this.state.settingToggled})

    updateDetails = (detailObj = {}) => {
        const memberRef = this.props.firestore.doc(this.props.doc.ref.path)

        this.setState({loading: true})

        memberRef
            .update(detailObj)
            .then(() => this.setState({
                uploadedDocData: { ...this.props.doc.data(), ...detailObj},
                loading: false
            }, this.toggleSettings))
    }

    getDocData = () => this.state.uploadedDocData
        ? this.state.uploadedDocData
        : this.props.doc.data()

    render() {
        const {name, email, phone, country, created, imageUrl, birthdate, address} = this.getDocData()
        const {uploadedImgUrl, settingToggled, loading} = this.state

        return (
            <div className={'Member'}>
                <PictureInput
                    blob={blob => this.uploadPicture(blob)}
                    preview={uploadedImgUrl || imageUrl}
                    loading={loading === true}
                />

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
                        loading={loading === true}
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