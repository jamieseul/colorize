/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
// const queryString = require('query-string');

const Container = styled.ul`
		width: 80%;
    padding: 0;
    // border: solid grey 1px;
    display: flex;
    flex-flow: row wrap;
	justify-content: space-evenly;
	-webkit-justify-content: space-evenly !important
	-webkit-flex-flow: row wrap;
    margin: 0 -10px;
`;

const ItemLink = styled(Link)`
    position: relative;
    width: 17%;
    max-width: 300px;
    min-width: 225px;
    max-height: 300px;
    min-height: 300px;
	margin: 0 10px;
	margin-bottom: 20px;
    &:visited {
        color: black;
        text-decoration: none 
    }  
    @media (max-width: 250px) {
				width: 90%;
				min-width: 100px;
	}
`;
const Item = styled.li`
    // border: solid red 1px;
    width: 100%;
    height: 100%;
    font-size: 30px;
	list-style: none;
`;
const Img = styled.img`
    width: 100%;
    height: 75%;
	background-color: white;
	object-fit: contain;
	justify-content: center;
	display: block;
`;
const Colorline = styled.div`
	width: 100%;
	height: 10px;
	background-color: #${props => props.color};
	margin-bottom: 5%;
`;
const ItemBottom = styled.div`
	float: bottom;
	width: 100%;
	height: 25%;
	display: block;
`;
const ItemColor = styled.div`
	width: 100%;
	text-align: center;
	color: #${props => props.color};
	font-size: 30%;
`;
const ItemDetails = styled.div`
	width: 100%;
	text-align: center;
`;
const ItemName = styled.div`
	font-size: 43%;
	text-overflow: scale;
	color: black;
	font-weight: bold;
`;
const Detail = styled.div`
	font-size: 40%;
	color: grey;
`;
const Brand = styled.span`
	font-weight: bold;
`;
const Rating = styled.div`
	font-size: 70%;
`;
const Stars = styled.span`
	vertical-align: middle;
`;
const Review = styled.span`
	font-size: 60%;
	vertical-align: middle;
	color: grey;
	`;

const Items = ({ item }) => (
  <Container>
    {item.map((item, i) => (
      <ItemLink to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }} >
          <Item key={i}>
			<Img src={item.item_photo}/>
						<Colorline color={item.hex}/>
            <ItemBottom>
							<ItemDetails>
								{/* <ItemColor color={item.hex}>{item.color}</ItemColor> */}
								<ItemName>{item.name}</ItemName>
								<Detail><Brand>{item.brand}</Brand> {item.volume} / {item.price}원</Detail>
								<Rating>
										<Stars><StarRatingComponent
										name="itemList"
										editing={false}
										value={item.avg}
										/></Stars> <Review>({item.reviews})</Review>
								</Rating>
							</ItemDetails>
            </ItemBottom>
            </Item>
        </ItemLink>
        ))}
  </Container>
);

export default Items;
