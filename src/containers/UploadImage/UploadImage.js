import React, { Component } from "react";
import {
  Form,
  Message,
  Container,
  Segment,
  Image,
  Button,
} from "semantic-ui-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";

import { upload, uploadReset } from "../../store/actions/uploadActions";
import classes from "./UploadImage.module.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class UploadImage extends Component {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1,
    },
    croppedImageUrl: null,
  };
  componentDidMount() {
    this.props.onUploadReset();
  }
  handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ src: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.croppedImage);
    this.props.onUpload(formData, this.props.token);
  };
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

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

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  render() {
    const { crop, profile_pic, src } = this.state;
    const { loading, error, userData, success } = this.props;

    if (success && src) {
      return <Redirect to={`/user/${userData.username}`} />;
    }

    return (
      <Container className={classes.Upload}>
        <p style={{ textAlign: "left" }}>
          <Button
            circular
            icon="arrow left"
            as={Link}
            to={`/user/${userData.username}`}
          />
        </p>
        <Image src={userData._links.avatar_large} style={{ margin: "auto" }} />
        <Form error as={Segment}>
          <Form.Input
            type="file"
            value={profile_pic}
            onChange={this.handleFile}
          />

          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
          <div style={{ textAlign: "right" }}>
            <Form.Button
              loading={loading}
              disabled={loading}
              onClick={this.handleSubmit}
            >
              Save
            </Form.Button>
          </div>
          {!loading && error && <Message error>{error}</Message>}
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.upload.loading,
    error: state.upload.error,
    success: state.upload.success,
    userData: state.currentUser.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (formData, token) => {
      dispatch(upload(formData, token));
    },
    onUploadReset: () => dispatch(uploadReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
