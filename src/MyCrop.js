import React, {Component} from 'react';
import ReactCrop from "react-image-crop";
import image2base64 from 'image-to-base64';


class MyCrop extends Component {

    state = {
        crop: {
            aspect: parseInt(document.getElementById('cropper_aspect_x').value) / parseInt(document.getElementById('cropper_aspect_y').value),
            locked: false,
            keepSelection: false,
            x: 5,
            y: 5,
            width: null,
            height: 90,
            unit: "%",
        },
        croppedImageUrl: "",
        croppedImg: "",
    }

    handleCropChange = crop => {
        this.setState({ crop });
    };

    handleCropCompleted = crop => {
        this.makeClientCrop(crop);
    };


    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            image2base64(croppedImageUrl) // you can also to use url
                .then(
                    (response) => {
                        this.setState( prevState => ({
                            croppedImg : 'data:image/jpeg;base64,'+response
                        }));
                        document.getElementById(this.props.guid).value = this.state.croppedImg;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
            this.setState({ croppedImageUrl });
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
        this.setState({
            crop: {
                ...this.state.crop,
                width: image.naturalWidth
            }
        });
    };

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
        return (
            <div className="singleImageMultiple" key={this.props.guid}>
                <input type="hidden" name="cropper_image[]" id={this.props.guid}></input>

                <ReactCrop
                    ref={this.props.guid}
                    key={this.props.guid}
                    src={this.props.presigned_photo_url}
                    crop={this.state.crop}
                    onChange={this.handleCropChange}
                    onComplete={this.handleCropCompleted}
                    class="__cropper_image"
                    onImageLoaded={this.onImageLoaded.bind(this)}

                />
                <input type="text" name="cropper_image_title[]" placeholder="Başlık" class="cropper_image_title"></input>

            </div>
        );
    }
}

export default MyCrop;