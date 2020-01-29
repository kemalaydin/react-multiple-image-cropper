import React, {Component} from 'react';
import ReactCrop from "react-image-crop";
import image2base64 from 'image-to-base64';
import { FaCheck, FaTimes,FaTrashAlt } from 'react-icons/fa';



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
        cropStop : false,
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

    imageCropped = () => {
        const croppedData = !this.state.cropStop;
        this.setState({
            cropStop: croppedData
        });
    }

    deleteImage = () => {

    }

    render() {
        const {cropStop} = this.state;
        return (
            <div className="singleImageMultiple" key={this.props.guid}>
                <input type="hidden" name="cropper_image[]" id={this.props.guid}></input>
                {!cropStop && (
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
                )}

                {cropStop && (
                    <img src={document.getElementById(this.props.guid).value} />
                )}

                <span onClick={() => this.props.handler(this.props.guid)}
                      style={{ backgroundColor: '#c9485b', fontSize: "25px", borderRadius: "20px", color: 'white', paddingTop: "6px", paddingBottom: "3px", paddingLeft: "6px", paddingRight: "6px"}}
                      class="crop_delete_button"
                >
                    <FaTrashAlt/>
                </span>

                    { !cropStop && (
                    <span onClick={this.imageCropped}
                          class="crop_check_button"
                          style={{ backgroundColor: '#75b79e', fontSize: "25px", borderRadius: "20px", color: 'white', paddingTop: "6px", paddingBottom: "3px", paddingLeft: "6px", paddingRight: "6px"}}
                    ><FaCheck /></span>
                )}

                { cropStop && (
                    <span onClick={this.imageCropped}
                          class="crop_back_button"
                          style={{ backgroundColor: '#df8543', fontSize: "25px", borderRadius: "20px", color: 'white', paddingTop: "6px", paddingBottom: "3px", paddingLeft: "6px", paddingRight: "6px"}}
                    ><FaTimes /></span>
                )}

                {
                    document.getElementById('cropper_input_1').value && (
                        <input type="text" name="cropper_input_1[]" class="cropper_input" placeholder={document.getElementById('cropper_input_1_placeholder').value}></input>

                    )
                }

                {
                    document.getElementById('cropper_input_2').value && (
                        <input type="text" name="cropper_input_2[]" class="cropper_input" placeholder={document.getElementById('cropper_input_2_placeholder').value}></input>

                    )
                }

                {
                    document.getElementById('cropper_input_3').value && (
                        <input type="text" name="cropper_input_3[]" class="cropper_input" placeholder={document.getElementById('cropper_input_3_placeholder').value}></input>

                    )
                }

                {
                    document.getElementById('cropper_input_4').value && (
                        <input type="text" name="cropper_input_4[]" class="cropper_input" placeholder={document.getElementById('cropper_input_4_placeholder').value}></input>

                    )
                }

                {
                    document.getElementById('cropper_input_5').value && (
                        <input type="text" name="cropper_input_5[]" class="cropper_input" placeholder={document.getElementById('cropper_input_5_placeholder').value}></input>

                    )
                }

                {
                    document.getElementById('cropper_input_6').value && (
                        <input type="text" name="cropper_input_6[]" class="cropper_input" placeholder={document.getElementById('cropper_input_6_placeholder').value}></input>

                    )
                }


            </div>
        );
    }
}

export default MyCrop;