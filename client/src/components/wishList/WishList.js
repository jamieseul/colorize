/* eslint-disable */

import React, {Component} from 'react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import Login from '../user/Login'
import {Redirect} from 'react-router-dom';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import './WishList.css';
 
import axios from 'axios';
import { url } from '../../config';


const confirm = Modal.confirm;

const Deletebtn = styled.button`
    position: absolute;
    border: none
    top:0
    left:0
    padding: 0 
    height: 25px;
    width: 25px;
    float:left
    font-size: 1rem
    border-radius: 50%;
    transition: 0.5s;
    cursor: pointer
    background: black
    color: white
    &:hover {
        color: white;
        text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    }
    text-align:center
`

const Empty = styled.div`
    display: flex;
    flex-direction: column
    justify-content: center;
    border-bottom: 1px solid black
    border-top: 1px solid black
    width : 100%
    min-height: 300px
    text-align: center;
    margin-top: 80px
`
const EmptyTitle = styled.div`
    text-align: center;
    font-size: 4rem
    font-family: 'Roboto';
    font-weight: 100;
    color: black
    @media (max-width: 656px) {
        font-size: 3.5rem
    }
    @media (max-width: 511px) {
        font-size: 2.8rem
    }
    @media (max-width: 511px) {
        font-size: 2.4rem
    }
    @media (max-width: 379px) {
        font-size: 2rem
    }
`

const EmptyMessage = styled.div`
    font-size: 2rem
    font-family: 'Roboto';
    font-weight: 100;
    @media (max-width: 656px) {
        font-size: 1.75rem
    }
    @media (max-width: 573px) {
        font-size: 1.6rem
    }
    @media (max-width: 519px) {
        font-size: 1.4rem
    }
    @media (max-width: 457px) {
        font-size: 1.2rem
    }
    @media (max-width: 375px) {
        font-size: 1rem
    }    
    @media (max-width: 320px) {
        font-size: 0.8rem
    }
`
const Emptybtn = styled.button`
    min-width: 20%;
    max-height: 20%
    margin: 20px auto
    border: none;
    background-color: black;
    color: white;
    padding: 14px 28px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem 
    font-family: 'Roboto';
    font-weight: 300;
    border:0
    outline:0
    &:hover {
        text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
        // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;
    }  
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 70px auto;
    @media (max-width: 768px) {
        margin-top: 50px;
    }
`

const Title = styled.div`
    margin: 20px auto auto auto
    font-size: 3rem
    font-family: 'Roboto';
    font-weight: 100;
    color: black
    width: 80%;
    border-bottom: 1px solid black
    @media (max-width: 1024px) {
        text-align: center
    }
`

const Container = styled.ul`
	width: 80%;
    padding: 5px 0 0 0
    // border: solid grey 1px;
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto;
    justify-content:space-evenly;
`;

const ItemLink = styled.div`
    position: relative;
    width: 17%;
    max-width: 300px;
    min-width: 225px;
    max-height: 300px;
    min-height: 300px;
		margin: 0 10px;
		margin-bottom: 20px;
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
	vertical-align: middle
	color: grey;
    `;


class WishList extends Component {
    constructor(props){
        super()
        this.state = {
            items: [],
            tokenVerified: true,
            isLoading: true
        }
    }

     goHome = () => {
         this.props.history.push('/')
     }   
    
     showDeleteConfirm = (e) => {
        const form = {
            color_id: e.target.id
        }     
        confirm({
          title: '선택한 아이템을 삭제 하시겠습니까?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',

          onOk: ()=> {
            const token = localStorage.getItem('token') 
            axios.post(`${url}/api/wishlist/delete`, form, {headers: {'token': token}})
                .then((response) => {
                    axios.get(`${url}/api/wishlist/get/list`, {headers: {'token': token}})
                    .then((response) => {
                        this.setState({
                            items: response.data.rows,
                            isLoading: false
                        })
                      })
                  })
          },
          onCancel() {
          },
        });
      }
      

    componentDidMount(){ 
        const token = localStorage.getItem('token')  
        axios.get(`${url}/api/wishlist/get/list`, {headers: {'token': token}})
        .then((response) => {
            if(response.data.success===true){
                this.setState({
                    items: response.data.rows,
                    isLoading: false
                })
            }else {
                //Link로 타고들어오면 이게 없으면 nav로그인 상태는 유지되어있다.
                this.props.handleLogout()
                this.props.history.push('/login', {from: this.props.location})
            }
          })
    }

    render(){
        return (
            <Wrapper>
                {this.state.items.length ? <Title>Wishlist</Title> : null}
            <Container>
            {this.state.isLoading? <div style={{display:"none"}}>loading</div> : this.state.items.length ? this.state.items.map((item, i) => (
              <ItemLink >
                  <Item key={i}>
                  <Link to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                    <Img src={item.item_photo}/>
                  </Link>  
                    {/* <Deletebtn onClick={this.deleteOne} id={item.color_id}>&times;</Deletebtn> */}
                        <Deletebtn id={item.color_id}  onClick={this.showDeleteConfirm} type="dashed">
                         &times;
                        </Deletebtn>
                        <Colorline color={item.hex}/>
                    <Link to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                    <ItemBottom>
                        <ItemDetails>
                            <ItemName>{item.item_name}</ItemName>
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
                    </Link> 
                    </Item>
                </ItemLink>
                )) : <Empty>
                        <EmptyTitle>Wishlist is empty</EmptyTitle> 
                        <EmptyMessage>Colorize에서 마음에 드는 립스틱들의 <br/>리뷰를 구경하고 위시리스트에 담아보세요</EmptyMessage>
                        <Emptybtn onClick={this.goHome}>Colorize yourself</Emptybtn>
                     </Empty>}
          </Container>
          </Wrapper>
        );
    }
};

export default WishList;

