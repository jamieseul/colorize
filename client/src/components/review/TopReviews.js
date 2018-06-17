import React from 'react';
import TopContent from './TopContent';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 100%;
`
const TopReview = (props) => {
    return (
        <Div>
            <TopContent  id={props.id} data={props.Topdata} isLogined={props.isLogined}/>
        </Div>
    );
};

export default TopReview;