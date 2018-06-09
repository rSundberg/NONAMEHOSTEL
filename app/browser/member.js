import React, { Component } from 'react';

import '../shared/css/member.css'

import Upload from '../shared/media/upload_profile_picture.svg'

export default class Member extends Component {
    state = {
        uploadedImgUrl: null
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

    render() {
        const {name, email, phone, country, created, imageUrl} = this.props.doc.data()
        console.log(this.props)
        return (
            <div className={'Member'}>
                <div className={'Member__picture-wrapper'} onClick={this.triggerUpload}>
                    <img
                        className={'Member__picture'}
                        src={this.state.uploadedImgUrl || imageUrl}
                    />

                    <input
                        onChange={this.uploadPicture}
                        ref={this.pictureInput}
                        type="file"
                        capture="camera"
                        accept="image/*" />
                </div>

                <div className={'Member__info-wrapper'}>
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
                        {this.props.moment(created).format('DD-MMM-YYYY')}
                    </div>
                </div>
            </div>
        );
    }
}