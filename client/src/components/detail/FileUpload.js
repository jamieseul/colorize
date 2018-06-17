/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { url } from '../../config';
import styled from 'styled-components';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const Container = styled.div`
    // width: 55%;
    // height: 100%;
    // width: 10vw;
    margin-right:-11rem;
    display: flex;
    flex-direction: column;
    position : relative;
`
const FileButton = styled.input`
    // width: 100%;
    // display:none;
    color: transparent;
    // opacity : 0;
    ::-webkit-file-upload-button {
        background: black;
        color: white;
        height: 25px;
        border: none;
    }
`
const ImgDiv = styled.div`
    height: 100%;
    width: 100%;
    cursor: pointer;
    border: 2px solid red;
    object-fit: scale-down;
    margin-bottom: -20px;
`

Modal.setAppElement('#root');

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagepreviewUrl: '',
            popupIsOpen: false,
            data: '',
            isLoading: true
        }
        this._openPopup = this._openPopup.bind(this);
        this._afterOpenPopup = this._afterOpenPopup.bind(this);
        this._closePopup = this._closePopup.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._fileUploadHandler = this._fileUploadHandler.bind(this);
    }


    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        let mimeType = e.target.files[0].type.split('/')[0];
        reader.readAsDataURL(file)
        reader.onload = () => {
        mimeType === 'image' ?
            this.props.imagePreview(file, reader.result )
            :alert('Image 파일만 등록만 가능합니다')
        }


    }

    _openPopup() {
        this.setState({ popupIsOpen: true });
    }

    _afterOpenPopup() {
        this.subtitle.style.color = 'black';
        document.getElementById('closebtn').onmouseover = function(){
            document.getElementById("closebtn").style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F'
          }
          document.getElementById("closebtn").onmouseout = function() {
            document.getElementById("closebtn").style.textShadow = 'none'
          };
    }

    _closePopup() {
        this.setState({ popupIsOpen: false });
    }

    _fileUploadHandler(e) {
      //로그인 안되어있을때 사진올리는거 막기 

        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.post(`${url}/api/review/post/upload`, formData, { headers: { 'token': token , id: this.props.id} } )
            .then(response => {
                this.setState({
                    isLoading: false
                })
                this.props.callback(response.data.message)
            }

            )
            .catch(err => console.log(err))
    }



    render() {        
        let { imagepreviewUrl } = this.state;
        let $imagePreview = null;
        let popupImage = (<img src={imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)

        this.state.imagepreviewUrl ? $imagePreview = (<img onClick={this._openPopup} src={imagepreviewUrl} style={{ height: '100%', width: '80%' }} alt='Yours' />) :
            $imagePreview = (<div style={{textAlign:'center', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>리뷰 사진을 올려주세요</div>);

        return (
            <Container>
                <FileButton
                    type='file'
                    accept = "image/*"
                    onChange={(e) => { this._handleImageChange(e); this._fileUploadHandler(e) }} />
                <Modal
                    isOpen={this.state.popupIsOpen}
                    onAfterOpen={this._afterOpenPopup}
                    onRequestClose={this._closePopup}
                    style={customStyles}
                    contentLabel="Image popup"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
                    <div style={{ width: '50vh' }}>{popupImage}</div>
                    <button id='closebtn' style={{ cursor: 'pointer' }}  style={{ marginTop: '10px', fontWeight:'100', fontFamily:'Roboto', cursor: 'pointer', border:'0', outline:'0', backgroundColor:'black', color: 'white'  }} onClick={this._closePopup} onClick={this._closePopup}>close</button>
                </Modal>
            </Container>
        )
    }
}


export default FileUpload;