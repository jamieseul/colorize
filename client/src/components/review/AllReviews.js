import React from 'react';
import AllContent from './AllContent';
import styled from 'styled-components';

const Div = styled.div `
    width: 100%;
    height: 100%;
`
const AllReviews = (props) => {
    return (
        <Div>
            <AllContent id={props.id} data={props.data} />
        </Div>
    );
};

export default AllReviews;