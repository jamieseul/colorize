/* eslint-disable */
import React, { Component } from 'react';
import TopReviews from '../review/TopReviews';
import axios from 'axios';
import { url } from '../../config';
import styled from 'styled-components';

const Div = styled.div`
     width: 100%;
     height: 100%;
`
const TopDiv = styled.div`
    width: 100%;
    height: 15%;
    flex-direction : column;
`
const TitleDiv = styled.div`
    width: 100%;
    height: 80%;
`
const Border = styled.div`
    width: 100%;
    border : 2px solid #ccc
`
const BottomDiv = styled.div`
    width: 100%;
    height: 85%;
`

class TopReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topReview: '',
        };
    }
    componentDidMount() {
        const data = [];
        const token = localStorage.getItem('token')
        axios.get(`${url}/api/review/get/rank?color_id=${this.props.id}`, token !== null ? { headers: { 'token': token} }: null)
            .then(response => {
                for(var i = 0; i< response.data.rows.length; i++){
                    if(response.data.rows[i].likes>0){
                        data.push(response.data.rows[i])
                    }
                }
                this.setState({ topReview: data})
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Div>
                 {this.state.topReview.length !== 0 ?
                <TopDiv>
                    <TitleDiv><h2>Top Reviews</h2></TitleDiv>
                    <Border/>
                </TopDiv>
                : null}
                <BottomDiv>
                    {this.state.topReview.length !== 0 ? <TopReviews id = {this.props.id} Topdata={this.state.topReview} isLogined={this.props.isLogined}/> : null}
                </BottomDiv>
            </Div>
        );
    }
}


export default TopReview;
