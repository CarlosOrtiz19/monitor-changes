import {Button} from '@material-ui/core';
import React, {useState, useCallback} from 'react'
import ReactDOM from 'react-dom'
import ReactCrop, {makeAspectCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCard from './Cards'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class CropImage extends React.Component {

    state = {
        src: null,
        images: [],
        crop: {
            x: 10,
            y: 10,
            width: 100,
            height: 100
        }
    };

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                () =>
                    this.setState({
                        src: reader.result
                    }),
                false
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image) => {
        this.imageRef = image;
        console.log("onCropComplete", image);
    };

    onCropComplete = (crop) => {
        this.makeClientCrop(crop);
        console.log("onCropComplete", crop);
    };

    showSelections = () => {
        for (let index = 0; index < this.state.images.length; index++) {
            return
        }
    }

    confirmImage = () => {
        this.state.images.push(this.state.crop);
        console.log(this.state.images.length);
        console.log(this.state.images[this.state.images.length - 1])
        if (this.state.images.length > 1) {
            if (this.state.images[0] === this.state.images[1]) {
                console.log("identicals")
            } else {
                console.log("non identicals")
            }
        }
        return <ImageCard src={this.state.images[0]}/>
    }

    onCropChange = (crop) => {
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({croppedImageUrl});
        }
    }

    //show image in canvas
    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    render() {
        const {crop, croppedImageUrl, src} = this.state;
        return (
            <div className="container-fluid">
                {this.props.src && (
                    <ReactCrop
                        src={this.props.src}
                        crop={this.state.crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        minWidth={500}
                        minHeight={120}
                    />
                )}

                {croppedImageUrl && (
                    <img alt="Crop" style={{maxWidth: '100%'}} src={croppedImageUrl}/>
                )}
                <Button type="submit" variant="contained" color="primary" disableElevation onClick={this.confirmImage}>
                    confirm
                </Button>


            </div>
        );
    }
}

export default CropImage;

