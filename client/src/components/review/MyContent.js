/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import lip from '../../assets/lip.jpg';
import like from '../../assets/Heart.png';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-modal';
import axios from 'axios';
import { url } from '../../config';
import male from '../../assets/male.png';
import female from '../../assets/female.png';

const customStyles = {  
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
        overlay: {
            position: 'fixed',
            zIndex: 5
        }
};

Modal.setAppElement('#root');

const Container = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    display:flex;
    width:100%;
    height: 25vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 40vh;
    }
`
const Top = styled.div`
    height: 100%;
    width: 40%;
    display: flex;
    @media (max-width: 768px) {
        width: 100%;
        height: 50%;
        display: flex;
    }
`
const Info = styled.div`
    width: 40%;
    height: 100%;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    position : relative;
    @media (max-width: 768px) {
        width: 40%;
        height: 100%;
    }
`

const InfoDiv = styled.div`
    position: absolute;
    padding-top:2%;
    top:50%
    left:10%;
    transform: translateY(-50%);
    flex-direction: column;
    @media (max-width: 768px) {
        display: inline-block;
        font-size : 0.8rem;
    }
    @media (max-width: 320px) {
        font-size : 0.7rem;
    }
`
const UserDiv = styled.div`
    width: 5vw;
    height: 5vw;
    margin-bottom:10%;
    @media (max-width: 768px) {
        width: 10vw;
        height: 10vw;
        padding-top:2%;
        margin-bottom:-1%;
    }   

`
const UserImage = styled.img `
    border-radius: 50%;
    height: 100%; 
    width: 100%;
`
const ImageRating = styled.div`
    width: 60%;
    height: 100%;
    margin: 1%;
`

const GenderImage = styled.img `
    width: 8%;
    height: 8%;
`
const ReviewImage = styled.img`
    cursor: pointer;
    height: 96%; 
    width: 98%;
    padding: 1%;
    border-radius:5px;
    object-fit : cover;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`
const ReviewContent = styled.div`
    width: 60%;
    height: 100%;
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
        height: 50%;
    }
`
const Bubble = styled.div`
    position: relative;
    width: 98%;
    height: 70%;
    border: #7F7F7F solid 2px;
    text-align: center;
    border-radius: 5px;
    box-sizing:border-box;
    margin: 1% 1% 0 1%;
    padding: 1%
    @media (max-width: 768px) {
        width: 100%;
        height: 80%;
        border: none;
    }
`
const Message = styled.textarea`
    border: none;
    resize: none;
    width: 100%;
    height: 100%;
    overflow: auto;
    &: focus {
        outline: none;
    }
    @media (max-width: 768px) {
        background-color: #F4F5F9;
        border-radius : 5px;
    }
    @media (max-width: 320px) {
        font-size : 0.7rem;
    }
    
`
const BottomContainer = styled.div `
    height: 30%;
    @media (max-width: 768px) {
        width: 100%;
        height: 20%;
    }
`
const LikeCount = styled.div`
    width: 20%;
    height: 60%;
    margin: 0 0 0 85%;
    @media (max-width: 360px) {
        bottom: 0;
    }
`
const Like = styled.img`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 1.5rem;
        height: 1.5rem;
    }
    @media (max-width: 360px) {
        width: 1rem;
        height: 1rem;
    }
`

const ModalDiv = styled.div `
    width: 70vh;
    @media (max-width: 768px) {
        width: 60vw;
        height: 60vw;
        object-fit : contain;
    }
`
const PointButton = styled.button `
    cursor: pointer;
    outline: 0;
    margin-top:10px
    border: 0
    font-weight: 100
    font-family: Roboto
    background-color: black
    color: white
    &:hover {
        text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    }  
`

const Span = styled.span `
    font-size: 1.5rem;
    padding-left:5%;
    @media (max-width: 767px) {
        font-size: 0.8rem;
    }
    @media (max-width: 360px) {
        font-size: 0.8rem;
    }
`
const Button = styled.button`
    cursor: pointer;
    border: none;
    color: white;
    background-color: black;
`

class MyContent extends Component {
    constructor(props) {
        super();
        this.state = {
            popupIsOpen: false,
            imagepreviewUrl: '',
            data:''
        }

        this._openPopup = this._openPopup.bind(this);
        this._afterOpenPopup = this._afterOpenPopup.bind(this);
        this._closePopup = this._closePopup.bind(this);
    }

    _openPopup(e) {
        this.setState({
            popupIsOpen: true,
            imagepreviewUrl: e.target.src
        })
    }

    _afterOpenPopup() {
        this.subtitle.style.color = 'black';
    }

    _closePopup() {
        this.setState({ popupIsOpen: false });
    }

    render() {
    let popupImage = (<img src={this.state.imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)

        return (
            <Container>
                <Top>
                    <Info>
                        <InfoDiv>
                            <UserDiv> 
                                <UserImage alt='user' src = {this.props.user.user_photo}/>
                            </UserDiv>
                            <div><strong>{this.props.user.name}</strong> <GenderImage alt ='gender' src = {this.props.user.gender === 'male'? male : female}/></div>
                            <div>{this.props.user.age}세 · {this.props.user.tone}<br/></div>
                            <div style={{ fontSize: '0.8rem'}}> {this.props.user.writeAt.split(' ')[0]} </div>
                            <div>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    value={this.props.user.rating}
                                />
                            </div>
                        </InfoDiv>
                    </Info>
                    <ImageRating>
                        <ReviewImage onClick={this._openPopup} src={this.props.user.review_photo} />
                    </ImageRating>
                </Top>
                <ReviewContent>
                    <Bubble> 
                        <Message value= {this.props.user.message} readOnly/>
                    </Bubble>
                    <BottomContainer >
                
                        <LikeCount>
                                        {/* < Button >수정 </Button> */}
                            <Like src={like} />
                            <Span>{this.props.user.likes}</Span>
                        </LikeCount>
                    </BottomContainer>
                </ReviewContent >
        
                <Modal
                    isOpen={this.state.popupIsOpen}
                    onAfterOpen={this._afterOpenPopup}
                    onRequestClose={this._closePopup}
                    style={customStyles}
                    contentLabel="Image popup"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
                    <ModalDiv>{popupImage}</ModalDiv>
                    <PointButton onClick={this._closePopup}>close</PointButton>
                </Modal>
            </Container>
        );
    }
};

export default MyContent;