/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import like from '../../assets/Heart.png';
import hate from '../../assets/emptyHeart.png';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-modal';
import { url } from '../../config';
import axios from 'axios';
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

const Loading = styled.div `
    margin-top: 2%
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid black;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`
const LoadingDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center
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
    object-fit: cover;
    @media(max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`
const ReviewContent = styled.div `
    width: 60%;
    height: 100%;
    position: relative;
    @media(max-width: 768px) {
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
    padding: 1%;
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
const LikeCount = styled.div `
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

const PointButton = styled.button `
    cursor: pointer;
    outline: 0;
    border: 0
    margin-top:10px
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


class AllContent extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            popupIsOpen: false,
            imagepreviewUrl: '',
            items: this.props.data.length < 3 ? this.props.data.length : 3,
            loadingState: false,
            data : this.props.data
        }

        this._openPopup = this._openPopup.bind(this);
        this._afterOpenPopup = this._afterOpenPopup.bind(this);
        this._closePopup = this._closePopup.bind(this);
        this._reviewLike = this._reviewLike.bind(this);
        this._displayItems = this._displayItems.bind(this);
        this._loadMoreItems = this._loadMoreItems.bind(this);
    }

    _reviewLike(e) {
        const token = localStorage.getItem('token')
        const reviewId = this.props.data[e.target.id].review_id
        const form = {
            review_id: reviewId
        }
        axios.post(`${url}/api/review/update/like`,form, { headers: { 'token': token } })
            .then((res) => {
                return axios.get(`${url}/api/review/get/list?color_id=${this.props.id}`, { headers: { 'token': token } })
                .then(response => {
                    this.setState({ data: response.data.rows })
                })
                .catch(err => console.log(err))
                }
            )
            .catch(err => console.log(err))            
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

    _displayItems() {
        const data = this.state.data ? this.state.data : [];
        const items = [];
        for (var i = 0; i < this.state.items; i++) {
           data.length ? items.push(
                <Container key={i}>
                    <Top>
                        <Info>
                            <InfoDiv>
                                <UserDiv> 
                                    <UserImage alt='user' src = {data[i].user_photo}/>
                                </UserDiv>
                                <div><strong>{data[i].name}</strong> <GenderImage alt='gender' src = {data[i].gender === 'male'? male : female}/></div>
                                <div>{data[i].age}세 · {data[i].tone}</div>
                                <div style={{ fontSize: '0.8rem'}}> {data[i].writeAt.split('T')[0]} </div>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    value={data[i].rating}
                                />
                            </InfoDiv>
                        </Info>       
                        <ImageRating>    
                            <ReviewImage onClick={this._openPopup} src = {data[i].review_photo}/>
                        </ImageRating>
                    </Top>
                    <ReviewContent >
                        <Bubble>
                            <Message value = {data[i].message} readOnly/>
                        </Bubble>
                       <BottomContainer>
                            <LikeCount>
                                <Like id={i} onClick={this._reviewLike} src={data[i].toggle === 'true' ? like : hate} />
                                <Span> {data[i].likes} </Span>
                            </LikeCount>
                        </BottomContainer>
                    </ReviewContent >
                </Container>
            ) : null;
        }
        return items;
    }

    _loadMoreItems() {
        this.state.items !== this.props.data.length ? this.setState({ loadingState: true }) : null;
            setTimeout( () => {
                this.setState({items: this.state.items + 2, loadingState: false });
            }, 3000)
    }

     
    componentDidMount() {
        this.state.items !== this.props.data.length ? window.addEventListener("scroll", () => {  
            if (document.body.scrollTop + document.body.clientHeight <= document.body.scrollHeight ){
             this._loadMoreItems() 
            }
        }) : window.removeEventListener("scroll", this._loadMoreItems());
    }

    componentWillUpdate(nextProps, nextState){
        if(nextState.items> this.props.data.length)  {
            return nextState.items = this.props.data.length;
        }
    }

    render() {

        let popupImage = (<img src={this.state.imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)

        return (
            <Div ref ='iScroll' >
                {this._displayItems()}
                {this.state.loadingState ? <LoadingDiv><Loading/></LoadingDiv>: ""}

                <Modal
                    isOpen={this.state.popupIsOpen}
                    onAfterOpen={this._afterOpenPopup}
                    onRequestClose={this._closePopup}
                    style={customStyles}
                    contentLabel="Image popup"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
                    <ModalDiv>{popupImage}</ModalDiv>
                    <PointButton id='closebtn' onClick={this._closePopup}>close</PointButton>
                </Modal>
            </Div>
        );
    }
};

export default AllContent;
