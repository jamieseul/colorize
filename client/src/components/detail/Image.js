/* eslint-disable */
import React, { Component } from 'react';
import noWish from '../../assets/emptyHeart.png';
import Wish from '../../assets/Heart.png';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../../config';

const Div = styled.div`
    height : 100%;
    border: solid black 1px;
    width: 29.5vw;
    margin-right: 1vw;
    position: relative;
    box-sizing: border-box; 
    background-color:white;
    @media (max-width: 768px) {
        width: 100%;
	    justify-content:center;
        height: 30%;
        border: none;
	}
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    justify-content: center;
    display: block;
`

const Wishlist = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: 1%;
    top:1%;
    cursor : pointer;
`
const Heart = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    justify-content: center;
    display: block;
`

var DetailLeft = (props) => {
    return (
        <Div>
            <Image src={props.data ? props.data[0].item_photo : null} alt={'lip'} />
            <Wishlist>
                <Heart onClick={props.changeWish} src={!props.data ? null : props.data[0].wish === 'true'  ? Wish : noWish} alt={'wishlist'} />  
            </Wishlist>
        </Div>
    )
}

export default DetailLeft;