/* eslint-disable */
import React, {Component} from 'react';
import Image from './Image';
import ItemDetail from './ItemDetail';
import AllReview from './AllReview';
import styled, { ThemeProvider } from 'styled-components';
import Comment from './Comment';
import TopReview from './TopReview';
import axios from 'axios';
import { url } from '../../config';
import { Modal } from 'antd';

const Container = styled.div`
    height: 100%;
    width: 80vw;
    margin: 100px 10% 0 10%;
    align-items: center;
	@media (max-width: 768px) {
        margin-top: 80px;
        flex-direction:column;
    }
`
const TopDetail = styled.div`
	height: 30vw;
	display: flex;
	@media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
	}
`
const Write = styled.div`
	margin-top: 10px;
	height: 30vh;
	@media (max-width: 768px) {
        height: 45vh;
	}
`

const ReviewDiv = styled.div`
    width: 100%;
    margin-top: 10px;
`

const HomeButton = styled.button`
    position: fixed;
    background-color:black;
    color: white;
    border: none;
    right:1%;
    bottom:1%;
    opacity: 1;
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover {
    opacity: 0.3;
    border: none;
  }
`

const Arrow = styled.i`
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6%;
`

const scrollStepInPx = 50;
const delayInMs = 10;

class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: '',
            intervalId : 0
        }
        this.scrollStep = this.scrollStep.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this._clickToWish = this._clickToWish.bind(this);
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - scrollStepInPx);
    }

    scrollToTop() {
        const intervalId = setInterval(this.scrollStep, delayInMs);
        this.setState({ intervalId: intervalId });
    }

    _clickToWish() {
    const token = localStorage.getItem('token')
    const form = {
        color_id: this.props.match.params.id
    }

    axios.post(`${url}/api/wishlist/update`, form, { headers: {'token': token}})
        .then((response) => {
            if (response.data.success === true) {
                return axios.get(`${url}/api/item/get/detail?color_id=${this.props.match.params.id}`,{headers : {'token': token}})
                    .then(response => {
                        this.setState({data : response.data.rows})
                        })
                    .catch(err => console.log(err))
            } else {
                this.login()
                this.props.handleLogout()
            }
        })
        .catch(err => console.log(err));
    }
    
   login() {
       Modal.error({
           title: '로그인 후 이용해 주세요'
       });
   }
    
    componentDidMount(){
        const token = localStorage.getItem('token')
        axios.get(`${url}/api/item/get/detail?color_id=${this.props.match.params.id}`,{headers : {'token': token}})
          .then(response => {
                if (response.data.success === true) {
                    this.setState({data : response.data.rows})
                } else {
                    this.props.handleLogout()
               }
          })
        .catch(err => console.log(err))
    }    

    render(){
        const {handleLogout} = this.props
        return (
            <Container>
                <TopDetail>
                    <Image data={this.state.data}  changeWish={this._clickToWish}/>
                    <ItemDetail data={this.state.data} id = {this.props.match.params.id}/>
                </TopDetail>
                <Write>
                    <Comment isLogined={this.props.isLogined} handleLogout={this.props.handleLogout} id={this.props.match.params.id}/>
                </Write>
                <ReviewDiv>
                    <TopReview id={this.props.match.params.id} isLogined={this.props.isLogined} />
                </ReviewDiv>
                <ReviewDiv>
                    {this.props.isLogined ? <AllReview handleLogout={handleLogout} id={this.props.match.params.id}/> : <div><h2>전체 리뷰를 보시려면 로그인 해주세요 </h2></div>}
                </ReviewDiv>
        </Container>
        )
    }
}


export default Detail;