import React, { Component } from 'react'
import loadImage from 'blueimp-load-image'
import 'blueimp-canvas-to-blob'

import '../shared/css/pictureinput.css'

import Upload from '../shared/media/upload_profile_picture.svg'

export default class PictureInput extends Component {
    pictureWrapper = React.createRef()
    
    pictureInput = React.createRef()

    triggerInput = input => input.current.click()

    toBlob = () => {
        let file = this.pictureInput.current.files[0]
        let options = {
            canvas: true,
            orientation: true,
            maxWidth: 1080,
            downsamplingRatio: 0.5
        }

        loadImage(
            file,
            canvas => canvas.toBlob(this.props.blob, 'image/jpeg'),
            options
        )
    }

    render() {
        const {preview, loading} = this.props
        let isBlobOrFile = preview instanceof File || preview instanceof Blob
        let url = isBlobOrFile ? URL.createObjectURL(preview) : preview

        return (
            <div
                ref={this.pictureWrapper}
                className={`PictureInput__picture-wrapper ${loading ? 'App__loading' : ''}`}
                onClick={() => this.triggerInput(this.pictureInput)}>

                {!preview
                    ? <Upload className={'PictureInput__picture-icon'} />
                    : <img className={'PictureInput__picture'} src={url} />
                }

                <input
                    className={'PictureInput__picture-input'}
                    ref={this.pictureInput}
                    type={'file'}
                    accept={'image/*'}
                    onChange={this.toBlob}
                />
            </div>
        )
    }
}