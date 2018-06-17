/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../../config';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import like from '../../assets/Heart.png';
import RModal from 'react-modal';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Dropzone from 'react-dropzone';
// import ImageCompressor from 'image-compressor.js';


const Wrapper = styled.div`
  width: 80%;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 50px;
    width: 95%;
  }
`
const Title = styled.div`
  margin: 20px auto
  font-size: 3rem
  font-family: 'Roboto';
  font-weight: 100;
  color: black
  width: 100%;
  border-bottom: 1px solid black
  @media (max-width: 1024px) {
    text-align: center
  }
`
const Container = styled.div`
  display:flex;
  width:95%;
  height: 25vh;
  margin: 1% auto;
  border: 1px solid black;
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
  }
`
const Top = styled.div`
  height: 100%;
  display: flex;
  width: 50%;
  @media (max-width: 768px) {
    height: 20vh;
    width: 100%;
    justify-content: space-between;
  }
`
const ItemLink = styled.div`
  width: 33.3333333333%; 
  height: 100%;
  margin: 0;
`
const MyImageDiv = styled.div`
  width: 33.3333333333%;
  height: 100%;
  cursor: pointer;
  position: relative;
  background-color: white;
  border: 1px solid #d9dee8;
  @media (max-width: 768px) {
    margin: 0;
    height: 100%;
  }
`
const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: white;
  object-fit: contain;
`
const Info = styled.div`
  padding: 1vh 1vw 1vh 1vw;
  width: 33.3333333333%;
  height: 100%;
  background-color: white;
  border: 1px solid #d9dee8;
  @media (max-width: 768px) {
    margin: 0;
    height: 100%;
  }
`

const MyImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: white;
  object-fit: cover;
`

const DeleteImage = styled.div`
  border-radius : 50%;
  border: 1px solid #d9dee8;
  width: 20%;
  height: 20%;
  position: absolute;
  right: -5%;
  top: -5%;
  background-color: white;
  text-align: center;
`

const ReviewContent = styled.div`
  margin: 1vh 1vw 1vh 0;
  width: 50%;
  height: 100%;
  position: relative;
  width: 50%;
  align-items: center;
  @media (max-width: 768px) {
    height: 20vh;
    width: 100%;
  }
`
const Bubble = styled.div`
  position: relative;
  width: 94%;
  margin: 0 3% 0 3%;
  height: 70%;
  padding: 5px;
  background: #FFFFFF;
  border-radius: 5px;
  border: #7F7F7F solid 1px;
`
const Message = styled.textarea`
  border: none;
  margin: 1% auto auto auto;
  resize: none;
  width: 95%;
  height: 12vh;
  &:focus {
    outline: none;
  }
`

const LikeCount = styled.div`
  height: 100%;
  margin: 5px;
  right: 1%;
  position: absolute;
`

const Like = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`
const BottomContainer = styled.div`
  position: relative;
  height: 30%;
  width: 100%;
  display: flex;
  padding-left: 3%;
  @media (max-width: 768px) {
    height: 30%;
  }
`
const Modify = styled.button`
  font-size: 0.8rem;    
  width: 60px;
  height: 30px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 3px 7px 3px 7px;
  margin: 5px 10px 5px 0px;
  border: 0;
  outline:0;
  background-color: black;
  &:hover {
    text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
  }
  @media (max-width: 768px) {
    font-size: 0.6rem;
    height: 20px;
    width: 50px;
  }
`
const Cancel = styled.button`
  font-size: 0.8em;    
  width: 60px;
  height: 30px;
  color: white;
  padding: 3px 7px 3px 7px;
  margin: 5px 10px 5px 24px;
  background-color: black
  left: 60px
  position: absolute
  border: 0;
  outline:0;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
  }
  @media (max-width: 768px) {
    font-size: 0.6rem;
    height: 20px;
    width: 50px;
    margin: 5px 10px 5px 3%;
  }
`

const UserDiv = styled.div`
  border: 1px solid black;
  width: 20%;
  height: 30%;
  border-radius:50%;
`

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
  @media (max-width: 660px) {
    font-size: 3.5rem
  }
  @media (max-width: 511px) {
    font-size: 2.8rem
  }
  @media (max-width: 511px) {
    font-size: 2.8rem
  }
  @media (max-width: 379px) {
    font-size: 2.1rem
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
  }  
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black'
  },
  overlay: {
    position: 'fixed',
    zIndex: 5
  }
};

const ModalDiv = styled.div `
    width: 70vh;
    @media (max-width: 768px) {
        width: 60vw;
        height: 60vw;
        object-fit : contain;
  `

const confirm = Modal.confirm;

RModal.setAppElement('#root');

const scrollStepInPx = 50;
const delayInMs = 10;

class MyReviews extends Component {
  constructor(){
    super();
    this.state = {
      data : '',
      intervalId: 0,
      popupIsOpen : false,
      imagepreviewUrl : '',
      clickedComment:'',
      isReply: false,
      rating : '',
      files:'',
      image:'',
      imageAddress : '',
      imagepreviewUrl: '',
      isLoading: true
    }

    this.scrollStep = this.scrollStep.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._afterOpenPopup = this._afterOpenPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onStarClick = this._onStarClick.bind(this);
    this._changeReply = this._changeReply.bind(this);
    this._reviewCancel = this._reviewCancel.bind(this);
    this._updateReply = this._updateReply.bind(this);
    this._reviewDelete = this._reviewDelete.bind(this);
  }



  scrollToTop() {
    let intervalId = setInterval(this.scrollStep, delayInMs);
    this.setState({ intervalId: intervalId });
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }

  _openPopup(e) {
    this.setState({
      popupIsOpen: true,
      imagepreviewUrl: e.target.src
    })
  }

  _afterOpenPopup() {
    this.subtitle.style.color = 'black';
    document.getElementById('closebtn').onmouseover = function(){
      document.getElementById("closebtn").style.textShadow = '0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F'
    }
    document.getElementById("closebtn").onmouseout = function() {
      document.getElementById("closebtn").style.textShadow = 'none'
    };
  }

  _closePopup() {
    this.setState({ popupIsOpen: false });
  }

  _onStarClick(nextValue, prevValue, name, e) {
    this.setState({ rating: nextValue });
  }

  _changeReply(e){
    var reviewId = this.state.data[e.target.id].review_id
    var rating = this.state.data[e.target.id].rating
    var image = this.state.data[e.target.id]
    this.setState({
      isReply: !this.state.isReply, 
      clickedComment: reviewId, rating:rating, image,
    })
  }

  _updateReply(e){
    const token = localStorage.getItem('token')
    const previousMessage = this.state.data[e.target.id].message;
    const form = {
      reviewPhoto : this.state.imageAddress || this.state.data[e.target.id].review_photo,
      reviewRating : this.state.rating,
      reviewMessage : this.modifyReview.value,
      review_id : this.state.data[e.target.id].review_id
     }
    axios.post(`${url}/api/review/update/message`, form,  { headers: { 'token': token } })
      .then((response) => {
        
        if(response.data.success){
          isReply: !this.state.isReply
          this.postReview();
        }
      })
      .catch(err => console.log(err));
  }

  _reviewDelete(e){
    const reviewId = this.state.data[e.target.id].review_id
    const form = {
      review_id : reviewId
    }
    confirm({
      title: '선택한 리뷰를 삭제 하시겠습니까?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      onOk () {
        const token = localStorage.getItem('token')
        axios.post(`${url}/api/review/delete`, form, {headers: {'token': token}})
          .then((res) => {
            window.location.reload();
          })
      },
      onCancel() {
      },
    });
  }

  postReview() {
    Modal.success({
      title: '후기가 등록되었습니다.',
      onOk: () => {
        window.location.reload();
      }
    });
  }

  _reviewCancel(e){
    var previousMessage = this.state.data[e.target.id].message;
    this.modifyReview.value = previousMessage;
       this.setState({
         isReply: !this.state.isReply
       })    
  }

  getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8)
        {
            return callback(-2);
        }
        var length = view.byteLength, offset = 2;
        while (offset < length) 
        {
            if (view.getUint16(offset+2, false) <= 8) return callback(-1);
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) 
            {
                if (view.getUint32(offset += 2, false) != 0x45786966) 
                {
                    return callback(-1);
                }
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                {
                    if (view.getUint16(offset + (i * 12), little) == 0x0112)
                    {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            }
            else if ((marker & 0xFF00) != 0xFF00)
            {
                break;
            }
            else
            { 
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}

  _onDrop(files){
    const token = localStorage.getItem('token')
    const file = files[0];
    const formData = new FormData();
    const img = new Image()
    var orientation = ''
    img.src = file.preview
    img.onload = (e)=> {
      this.getOrientation(file, (orientation) => {
        formData.append('img', file, orientation);
        const mimeType = file.type.split('/')[1];
        mimeType === 'jpg' || mimeType === 'JPG' || mimeType === 'jpeg' || mimeType === 'JPEG' || mimeType === 'png' || mimeType === 'PNG' ?
          (this.setState({file}),
          axios.post(`${url}/api/user/post/upload`, formData, {headers:{ 'token': token, 'orientation': orientation }} )
            .then(response => {
              this.setState({imageAddress : response.data.message})
              document.getElementById('imgloading').style.display = 'inline-block'
            })
            .catch(err => console.log(err)))
          : this.uploadImage();
      });
    }
  }

  goHome() {
    this.props.history.push('/')
  }     

  uploadImage() {
    Modal.error({
      title: 'Image 파일만 업로드 가능합니다.'
    });
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    axios.get(`${url}/api/review/get/user`, { headers: { 'token': token } })
      .then(response =>{ 
               
        if(response.data.success===true){
          this.setState({
             data: response.data.rows,
              isLoading: false
            })
        } else {
          this.props.handleLogout()
          this.props.history.push('/login', {from: this.props.location})
        }
      })
      .catch(err => console.log(err))
  }

  render(){   
    let popupImage = (<img src={this.state.imagepreviewUrl} style={{ width: '100%', height: '100%' }} alt='yours' />)
    
    return (
      <div style={{fontFamily: "Nanum Gothic" }}>
        <Wrapper>
          {this.state.data.length ? <Title> My Reviews </Title> : null}
          {this.state.isLoading? <div style={{display:"none"}}>loading</div> : this.state.data.length ?
          this.state.data.map((item, i) => {           
            return (
              <Container key={i}>
                <Top>           
                  <ItemLink><Link to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                    <ReviewImage src={item.item_photo} /></Link>
                  </ItemLink>
                  <Info>
                    <strong>
                    <div>{item.name}</div>           
                      {!this.state.isReply ? 
                        <div>내 평점:
                          <div>
                            <StarRatingComponent name="rate2" value={item.rating} editing = {false}/>
                          </div>
                        </div>
                      : this.state.isReply && this.state.clickedComment === item.review_id ?
                        <div> 평점 수정: 
                          <div>
                            <StarRatingComponent name="rate2" value={this.state.rating} onStarClick={this._onStarClick}/>
                          </div>
                        </div>
                      :
                        <div>내 평점:
                          <div>
                            <StarRatingComponent name="rate2" value={item.rating} editing = {false}/>
                          </div>
                        </div>
                        }
                    </strong>
                  </Info>
                <MyImageDiv>
                    {!this.state.isReply ?
                    <MyImage onClick={this._openPopup} src ={item.review_photo}  />
                    : this.state.isReply && this.state.clickedComment === item.review_id  ?
                    <Dropzone  onDropAccepted={ this._onDrop.bind(this) } size={ 50 }  accept = "image/*" style={{width: '100%', height: '100%'}}>
                      <div style={{width:'100%', height:'100%', textAlign:'center'}}>
                        <div style={{color: 'black' ,fontWeight: 'bold'}}> 이미지 변경 클릭 </div>
                        <div style= {{width: '100%', height:'90%'}}>
                          {this.state.file ? 
                          <img id='imgloading' style = {{ verticalAlign:'middle', width:'90%', height:'90%'}} 
                          src= {this.state.imageAddress ? this.state.imageAddress : 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'} />
                          :<img  src={item.review_photo} style={{width:'90%', height:'90%'}}/>}
                        </div>
                      </div>      
                    </Dropzone>
                    : <MyImage onClick={this._openPopup} src ={item.review_photo} />}
                    </MyImageDiv>
                </Top>
                <ReviewContent>
                  <Bubble>
                    {!this.state.isReply ?  <Message value = {item.message} readOnly/>
                    : this.state.isReply && this.state.clickedComment === item.review_id ? <Message defaultValue = {item.message} innerRef={ref => { this.modifyReview = ref; }}/>
                    : <Message value = {item.message} readOnly/>}
                  </Bubble>
                  <BottomContainer >
                    {!this.state.isReply ? <Modify id={i} onClick={this._changeReply}>수정</Modify> 
                    : this.state.isReply && this.state.clickedComment === item.review_id ? 
                    <Modify id={i} onClick={this._updateReply}>완료</Modify>
                    :<Modify id={i} onClick={this._changeReply}>수정</Modify> }
                    {!this.state.isReply ? <Modify id={i} onClick={this._reviewDelete}> 삭제</Modify> 
                      : this.state.isReply && this.state.clickedComment === item.review_id ? <Cancel id={i} onClick = {this._reviewCancel} > 취소 </Cancel>
                      : <Modify id={i} type="dashed" onClick={this._reviewDelete}> 삭제</Modify> }
                    <LikeCount>
                      <Like src={like} />
                      {item.likes}
                    </LikeCount>
                  </BottomContainer>
                </ReviewContent >
            </Container>
           )
            }): <Empty>
                  <EmptyTitle>My Reviews is empty</EmptyTitle> 
                  <EmptyMessage>Colorize에서 마음에 드는 칼러의 <br/>립스틱을 구경하고 리뷰를 작성해보세요</EmptyMessage>
                  <Emptybtn onClick={this.goHome.bind.bind(this)}>Colorize yourself</Emptybtn>
                </Empty>}
        <RModal
          isOpen={this.state.popupIsOpen}
          onAfterOpen={this._afterOpenPopup}
          onRequestClose={this._closePopup}
          style={customStyles}
          contentLabel="Image popup"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Review Image</h2>
          <ModalDiv>{popupImage}</ModalDiv>
          <button id='closebtn' style={{ marginTop: '10px', fontWeight:'100', fontFamily:'Roboto', cursor: 'pointer', border:'0', outline:'0', backgroundColor:'black', color: 'white'  }} onClick={this._closePopup}>close</button>
        </RModal>
      </Wrapper>
      </div>
    )
  }
}



export default MyReviews;