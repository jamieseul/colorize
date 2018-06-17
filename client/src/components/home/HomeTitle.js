import React from 'react';
import styled from 'styled-components';
import lipImage from '../../assets/lipImage.png';

const TitleContainer = styled.div`
   background-color: white;
   text-align:center;
   position: fixed;
   width: 100%;
`

const Title = styled.span`
    text-align: center;
    font-size: 4rem;
`

const TitleImage = styled.img`
    width:200px;
    height:px
`

const HomeTitle = () => {
    return (
        <TitleContainer>
            <TitleImage src={lipImage}/>
            <Title>Pick Your Color</Title>
        </TitleContainer>
    );
};

export default HomeTitle;