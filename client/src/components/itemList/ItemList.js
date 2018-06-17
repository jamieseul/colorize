/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';

import history from '../../utils/history'
import { Link } from 'react-router-dom';

import Items from './Items'
import axios from 'axios';
import { url } from '../../config';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    -webkit-align-items: center;
    @media (max-width: 768px) {
        margin-top: 50px;
    }
`;

const SortContainer = styled.div`
    display: flex;
    margin-top: 30px;
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const Btn = styled(Link)`
    border: none;
    color:white
    outline: none;
    padding: 8px 8px;
    min-width:77px;
    text-align: center;
    text-decoration: none
    background-color: black;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: 'Roboto';
    font-weight: 300;
    &:visited {
        color: white;
    }
    &:hover {
        color: white
        text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    }
    @media (max-width: 430px) {
        font-size: 0.8rem;
        min-width:70px;
        padding: 6px 6px;
    }
    @media (max-width: 420px) {
        font-size: 0.8rem;
        min-width:68px;
        padding: 4px 4px;
    }
    @media (max-width: 375px) {
        font-size: 0.8rem;
        min-width:50px;
        padding: 5px 5px;
        margin-left: 7px
    }
    @media (max-width: 320px) {
        font-size: 0.7rem;
        min-width:50px;
        padding: 3px 3px;
        margin-left: 2px
    }
`;

const Loading = styled.div`
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid black;
    margin-top: 250px;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
      @media (max-width: 414px) {
        margin-top: 200px;
      }
      @media (max-width: 375px) {
        margin-top: 125px;
      }
`
const scrollStepInPx = 50;

const delayInMs = 10;

class ItemList extends Component {
    constructor(props){
        super()
        this.state = {
            item: [],
            isLoading: true
        }
        this.scrollStep = this.scrollStep.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep, delayInMs);
        this.setState({ intervalId: intervalId });
        document.getElementById('top').style.borderColor = "none"
    }
     
     handeHighPrice = () => {         
        axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=price DESC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('desc').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F';
        document.getElementById('asc').style.textShadow = 'none';
        document.getElementById('rating').style.textShadow = 'none';
        document.getElementById('latest').style.textShadow = 'none';
        document.getElementById('review').style.textShadow = 'none';
        }
    
     handleLowPrice = () => {
        axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=price ASC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('asc').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F';
        document.getElementById('desc').style.textShadow = 'none';
        document.getElementById('rating').style.textShadow = 'none';
        document.getElementById('latest').style.textShadow = 'none';
        document.getElementById('review').style.textShadow = 'none';
    }
    
     handleRating = () => {
        axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=avg DESC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('rating').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F';
        document.getElementById('desc').style.textShadow = 'none';
        document.getElementById('asc').style.textShadow = 'none';
        document.getElementById('latest').style.textShadow = 'none';
        document.getElementById('review').style.textShadow = 'none';
    }
    
     handleLatest = () => {
        axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=date DESC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('latest').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F'; 
        document.getElementById('desc').style.textShadow = 'none';
        document.getElementById('asc').style.textShadow = 'none';
        document.getElementById('rating').style.textShadow = 'none';
        document.getElementById('review').style.textShadow = 'none';
    }
        
    handleReview = () => {
         axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=reviews DESC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('review').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F'; 
        document.getElementById('latest').style.textShadow = 'none';
        document.getElementById('desc').style.textShadow = 'none';
        document.getElementById('asc').style.textShadow = 'none';
        document.getElementById('rating').style.textShadow = 'none';
    }

    componentDidMount(){
        switch (this.props.history.location.search.split('=')[1]) {
            case 'price_desc' : this.handeHighPrice(); 
                break;
            case 'price_asc' : this.handleLowPrice(); 
                break;
            case 'latest' : this.handleLatest(); 
                break; 
            case 'reviews_desc' : this.handleReview(); 
                break; 
            default : this.renderDefault();
                break;
        }
    }

    renderDefault = () =>{
        axios.get(`${url}/api/item/get/list?color_id=[${this.props.match.params.id.split('&')}]&order_by=avg DESC`)
        .then((response) => {
            this.setState({item: response.data.rows, isLoading: false})
          })
        document.getElementById('rating').style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F';
    }
 
    render(){
        return (
            <Wrapper>
                    <SortContainer>
                        <Btn to={`?sort=rating`} style={{textDecoration: 'none'}} onClick={this.handleRating} id='rating'>별점순</Btn>
                        <Btn to={`?sort=reviews_desc`} style={{marginLeft: '10px', textDecoration: 'none'}} onClick={this.handleReview} id='review'>리뷰순</Btn>
                        <Btn to={`?sort=price_desc`} style={{marginLeft: '10px', textDecoration: 'none'}} onClick={this.handeHighPrice} id='desc'>높은가격순</Btn>
                        <Btn to={`?sort=price_asc`} style={{marginLeft: '10px', textDecoration: 'none'}} onClick={this.handleLowPrice} id='asc'>낮은가격순</Btn>
                        <Btn to={`?sort=latest`} style={{marginLeft: '10px', textDecoration: 'none'}} onClick={this.handleLatest} id='latest'>최신순</Btn>
                    </SortContainer>
                    {this.state.isLoading ?   
                <Loading />:<Items item={this.state.item}/> }
            </Wrapper>
        )
    }    
};

export default ItemList;