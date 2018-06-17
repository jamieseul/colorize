/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import AllReviews from '../review/AllReviews';
import { url } from '../../config';
import styled from 'styled-components';

const Div = styled.div`
     width: 100%;
     height: 100%;
`
const Container = styled.div`
    @media (max-width: 768px) {
        display : ${props => props.display ? 'block' : 'none'}
    }
`
const TopDiv = styled.div `
    width: 100%;
    height: 15%;
    flex-direction : column;
`
const TitleDiv = styled.div `
    width: 100%;
    height: 80%;
`
const Border = styled.div `
    width: 100%;
    border : 2px solid #ccc
`
const BottomDiv = styled.div `
    width: 100%;
    height: 85%;
`
const ReviewDiv = styled.div `
    width: 100%;
    cursor: pointer;
    display: none;
    font-size: 1.1rem;
    @media (max-width: 768px) {
        display : inline-block;
	}

`

class Allreview extends Component{
    constructor(){
        super()
        this.state = {
            data : '',
            display: false
        }
        this.allReview = this.allReview.bind(this);
    }

    allReview(){
        this.setState({display : !this.state.display})
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        axios.get(`${url}/api/review/get/list?color_id=${this.props.id}`, { headers: { 'token': token } })
            .then(response => {
               if(response.data.success===true){
                this.setState({ data: response.data.rows })
               } else {
                this.props.handleLogout()
               }
            }
        )
    }

    render(){
        return(
            <Div>
                 {this.state.data.length !== 0 ?
                 <Container display={this.state.display}>
                <TopDiv>
                    <TitleDiv><h2>All Reviews</h2></TitleDiv>
                    <Border/>
                </TopDiv>
                <BottomDiv>
                    <AllReviews id = {this.props.id} data={this.state.data}/> 
                </BottomDiv> 
                </Container>
              : <div><h2>등록된 리뷰가 없습니다</h2></div>}
              {this.state.data.length !==0 ?<ReviewDiv onClick={this.allReview}>{!this.state.display ? '전체 리뷰 보기 >' : '전체 리뷰 닫기 <'}  </ReviewDiv> : null}
            </Div>  
              
        )
    }

}

export default Allreview;