import React, {Component} from 'react';
import ReactCrop from 'react-image-crop';
import MyCrop from "./MyCrop";


import 'react-image-crop/dist/ReactCrop.css';

class Unicropper extends Component {

    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);

    }

    state = {
        images: [

        ],
        cropOptions: {
            aspect: 16 / 9,
            locked: false,
            keepSelection: false,
            x: 2,
            y: 2,
            width: 94,
            height: 94
        }
    };

    handler(selectedImage) {
        const newImages = this.state.images.filter(function (e) {
            return e.guid != selectedImage;
        });

        this.setState({
            images : newImages
        })
    }

    onSelectFile = (e) => {
        // Kaç Dosya Eklendi : e.target.files.length
        var images = e.target.files;
        this.setState({
            images : []
        });

        if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach( (file,sort) => {
                const reader = new FileReader();
                reader.addEventListener('load', () =>
                    this.setState((prevState,file) => ({
                        images: prevState.images.concat(
                            [{
                                guid: Math.random(),
                                photo_file_name: file.name,
                                presigned_photo_url: reader.result,
                            }]),
                    }))
                );
                reader.readAsDataURL(file);
            });
        }
    };


    render() {
        const { images, selections } = this.state;

        let { cropOptions } = this.state;
        let renderedSelections = [];

        return (
            <div className="App">
                <div>
                    <div>
                        <input type="file" id="file" class="cropper_image_select" multiple onChange={this.onSelectFile} />
                    </div>
                    <div className="imageSelectedMultiple">
                        {
                            images.map((image,sort) =>
                                <MyCrop key={image.guid} {...image} {...cropOptions} handler = {this.handler}  sort={sort}/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Unicropper;