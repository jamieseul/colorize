/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import like from '../../assets/Heart.png';
import hate from '../../assets/emptyHeart.png';
import StarRatingComponent from 'react-star-rating-component';
import RModal from 'react-modal';
import male from '../../assets/male.png';
import female from '../../assets/female.png';
import axios from 'axios';
import { url } from '../../config';
import { Modal } from 'antd';

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

RModal.setAppElement('#root');

const Div = styled.div`
    width: 100%;
    height: 100%;
`
const Container = styled.div `
    margin-top: 10px;
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
const Top = styled.div `
    height: 100%;
    width: 40%;
    display: flex;
    @media (max-width: 768px) {
        width: 100%;
        height: 50%;
        display: flex;
    }
`
const Info = styled.div `
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

const InfoDiv = styled.div `
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
const UserDiv = styled.div `
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
const ImageRating = styled.div `
    width: 60%;
    height: 100%;
    margin: 1%;
`

const GenderImage = styled.img `
    width: 8%;
    height: 8%;
`
const ReviewImage = styled.img `
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
const ReviewContent = styled.div `
    width: 60%;
    height: 100%;
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
        height: 50%;
    }
`
const Bubble = styled.div `
    position: relative;
    width: 98%;
    height: 70%;
    border: #7F7F7F solid 2px;
    text-align: center;
    border-radius: 5px;
    box-sizing:border-box;
    margin: 1% 1% 0 1%;
    padding : 1%;
    @media (max-width: 768px) {
        width: 100%;
        height: 80%;
        border: none;
    }
`
const Message = styled.textarea `
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
const LikeCount = styled.div`
    width: 20%;
    height: 60%;
    margin: 0 0 0 85%;
    @media (max-width: 360px) {
      bottom: 0;
    }
`
const Like = styled.img `
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
const BottomContainer = styled.div `
    height: 30%;
    @media (max-width: 768px) {
        width: 100%;
        height: 20%;
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

const PointButton = styled.button`
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

class TopContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupIsOpen: false,
            imagepreviewUrl: '',
            data: ''
        }

        this._openPopup = this._openPopup.bind(this);
        this._afterOpenPopup = this._afterOpenPopup.bind(this);
        this._closePopup = this._closePopup.bind(this);
        this._reviewLike = this._reviewLike.bind(this);
    }

    _reviewLike(e) {
        const data = [];
        const token = localStorage.getItem('token')
        const reviewId = e.target.id
        console.log(e.target.id)
        const form = {
            review_id: reviewId
        }
        !this.props.isLogined ? this.login() :
        axios.post(`${url}/api/review/update/like`,form, { headers: { 'token': token } })
            .then((res) => {               

                return axios.get(`${url}/api/review/get/rank?color_id=${this.props.id}`, { headers: { 'token': token} })
                        .then(response => {
                            for(var i = 0; i< response.data.rows.length; i++){
                                if(response.data.rows[i].likes>0){
                                    data.push(response.data.rows[i])
                                }
                            }
                            this.setState({ data })
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => console.log(err))            
    }

    login() {
    Modal.error({
        title: '로그인 후 이용해 주세요'
    });
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

    componentDidMount(){
        this.setState({data : this.props.data})
    }

    render() {
        let popupImage = (<img src={this.state.imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)
        return (
            <Div>
                {this.state.data ? this.state.data.map((item, i) => {
                    return (
                        <Container key={i}>
                            <Top>
                                <Info>
                                    <InfoDiv>
                                        <UserDiv> 
                                            <UserImage alt='user'  src = {item.user_photo}/>
                                        </UserDiv>
                                            <div><strong>{item.name}</strong>  <GenderImage src = {item.gender === 'male'? male : female}/></div>
                                            <div>{item.age}세 · {item.tone}</div>
                                            <div style={{ fontSize: '0.8rem'}}> {item.writeAt.split('T')[0]} </div>
                                            <StarRatingComponent
                                                name="rate2"
                                                editing={false}
                                                value={item.rating}
                                            />
                                    </InfoDiv>
                                </Info>
                                <ImageRating>
                                    <ReviewImage onClick={this._openPopup} src = {item.review_photo}/>
                                </ImageRating>
                            </Top>
                            <ReviewContent>
                                <Bubble>
                                    <Message value = {item.message} readOnly/>
                                </Bubble>
                                <BottomContainer >
                                    <LikeCount>
                                        <Like id={item.review_id} onClick={this._reviewLike} src={item.toggle === 'true' ? like : hate} />
                                        <Span > {item.likes} </Span>
                                    </LikeCount>
                                </BottomContainer>
                            </ReviewContent>
                        </Container>
                    )
                }) : null}

                <RModal
                    isOpen={this.state.popupIsOpen}
                    onAfterOpen={this._afterOpenPopup}
                    onRequestClose={this._closePopup}
                    style={customStyles}
                    contentLabel="Image popup"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
                    <ModalDiv>{popupImage}</ModalDiv>
                    <PointButton onClick={this._closePopup}>close</PointButton>
                </RModal>
            </Div>
        );
    }
};

export default TopContent;
