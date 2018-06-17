/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { url } from '../config';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import avatar from '../assets/profile.png';
// import ImageCompressor from 'image-compressor.js';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import './Myinfo.css'

const Container = styled.div`
  padding-top: 100px;
  position: relative;
  display: block;
  font-size: 12px;
  line-height: 1.6;
  color: #666;
  width: 80%;
  margin: 0px auto;
  @media (max-width: 768px) {
    width: 90%;
    padding-top: 70px;
  }
  `
const Header = styled.h1`
  color: black;
  letter-spacing: -1px;
  text-align: left;
  font-family: Roboto;
  font-size: 3rem;
  font-weight: 100
  `

const Table = styled.table`
  width: 100%;
  border-top: 1px solid black;
  border-collapse: collapse;
  vertical-align: center;
`
const Row = styled.tr`
  display: table-row;
  vertical-align: center;
  border-color: inherit;
  @media (max-width: 768px) {
    width: 100%;
    height: 8vh !important;
  }
`
const Column = styled.th`
  width: 20vw;
  text-align: center;
  border-bottom: 1px solid #ddd;
  display: table-cell;
  vertical-align: center;
  color: #666;
  @media (max-width: 768px) {
    width: 30% !important;
    padding: 0;
  }
`
const Data = styled.td`
  width: 60vw;
  border-left: 1px solid #ddd;
  padding: 14px 30px;
  border-bottom: 1px solid #ddd;
  display: table-cell;
  vertical-algin: inherit;
  line-height: 1.6;
  color: #666;
  @media (max-width: 768px) {
    width: 70% !important;
    padding: 5px 5px 5px 10px;
    line-height: 1.6;
  }
`
const Intable = styled.table`
  border-collapse: collapse;
  line-height: 2;
  width: 100%;
`
const InTH = styled.th`
  font-weight: normal;
  text-align: left;
  padding-left: 8px;
  width: 100%;
`

const Buttons = styled.button `
  cursor: pointer;
  min-width: 70px;
  min-height: 25px;
  border: none;
  color: white;
  background-color: black;
  text-align: center;
  transition: 0.3s;
  border: 0;
  outline: 0;
  margin-right: 5%
  &:hover {
    text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
  }
  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px;
  }
`
const Input = styled.input`
  padding-left: 5px;
  border: 0.5px solid #ccc
`
const ProfPic = styled.img`
  vertical-align:middle;
  width:10vw;
  height:10vw;
  border-radius:50%;
  margin-right: 8px;
  object-fit: cover
  @media (max-width: 768px) {
    width:30vw;
    height:30vw;
  }
`
const ChangePic = styled.img`
  vertical-align: middle;
  justify-content: center;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  object-fit: cover;
`
const Img = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  object-fit: cover;
`

const CancelButton = styled.button `
  cursor: pointer;
  width: 10%;
  height: 5vh;
  border: none;
  color: black;
  background-color: #F4F5F9;
  text-align: center;
  opacity: 0.6;
  transition: 0.3s;
  border: n1px solid #d9dee8;
  &:hover {
      opacity: 1;
  }
`

class MyInfo extends Component {
  constructor(){
    super()
    this.state = {
      hasPhoto: true,
      data: '',
      tone : false,
      nickName : false,
      colorSelected : '',
      validate : true,
      file:'',
      confirmPassword : '',
      confirmNickname :'',
      minNum : '',
      imageAddress: ''
      }

    this._toneChange = this._toneChange.bind(this);
    this._photoChange = this._photoChange.bind(this);
    this._nickNameChange = this._nickNameChange.bind(this);
    this._comparePassword = this._comparePassword.bind(this);
    this._passwordInput = this._passwordInput.bind(this);
    this._submit = this._submit.bind(this);
    this._onColorSelect = this._onColorSelect.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._passwordCompare = this._passwordCompare.bind(this);
    this._confirmNickname = this._confirmNickname.bind(this);
    this._minNumber = this._minNumber.bind(this);
    this._nicknameOnchange = this._nicknameOnchange.bind(this);
    }

  componentDidMount(){
    const token = localStorage.getItem('token')
    axios.get(`${url}/api/user/get/info`, {headers: { 'token': token }})
      .then(response =>{
          if(response.data.success===true){
            this.setState({data : response.data.rows[0]})
          }else if(response.data.success===false) {
            this.props.handleLogout()
          }
      }) 
  }

  _toneChange(){
    this.setState({tone : !this.state.tone})
  }

  _confirmNickname(){
    const token = localStorage.getItem('token')
    const form = {
      userName: this.nickname.value
    }
      axios.post(`${url}/api/user/update/username`, form, { headers: {'token': token}})
        .then(response => {
          this.nickname.value.length > 6 || this.nickname.value.length < 2 ?
          (this.setState({confirmNickname : false}), this.nickerror()) 
          : response.data.success === false ?
            (this.setState({confirmNickname : false}), this.nickDuperror()) :
            (this.setState({confirmNickname : true}), this.nicksuccess())  
        })
        .catch(err => console.log(err));
  }

  _nicknameOnchange(){
  this.nickname.value.length <2 || this.nickname.value.length >6 ? this.setState({confirmNickname : false}) : null;
  }

  _photoChange(){
    this.setState({hasPhoto : !this.state.hasPhoto})
  }

  _nickNameChange(){
    this.setState({nickName : !this.state.nickName})
  }

  _comparePassword(){
    this.newPassword.value !== this.confirmPassword.value ? 
    this.setState({validate : false})
    : this.setState({validate : true})
  }

  _passwordInput(){
    !this.newPassword.value ? this.newPasswordFirst() : null;
  }

  _onColorSelect(option) {
    this.setState({ colorSelected: option.value })
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
          axios.post(`${url}/api/user/post/upload`, formData, { headers: { 'token': token,'orientation' : orientation} } )
            .then(response => {
              this.setState({imageAddress : response.data.message})
              // document.getElementById('imgloading').style.display = 'inline-block'
            })
            .catch(err => console.log(err)))
          : this.uploadImage();
      });
    }
  }

    _minNumber(){
      this.newPassword.value.length <5 || this.newPassword.value.length > 10 ? this.setState({minNum : false}) : this.setState({minNum : true})
    }

    _passwordCompare(){
      const token = localStorage.getItem('token')
      const form = {
        userPassword : this.password.value
      }
        axios.post(`${url}/api/user/update/password`, form, { headers: { 'token': token} })
            .then(response => {            
              response.data.success === true || !this.password.value ? this.setState({confirmPassword : true}) : this.setState({confirmPassword : false})
            })
            .catch(err => console.log(err));
    }
    
    success() {
      Modal.success({
        title: '정보가 수정되었습니다.',
        onOk: ()=> {
          window.location.reload()
        }
      });
    }

    nicksuccess() {
      Modal.success({
        title: '사용가능한 닉네임입니다.',
        onOk: ()=> {
        }
      });
    }

    error() {
      Modal.error({
        title: '변경 정보를 확인해주세요'
      });
    }

    nickerror() {
      Modal.error({
        title: '닉네임은 2글자 이상 6글자 이하여야 합니다.'
      });
    }

    nickDuperror() {
      Modal.error({
        title: '중복된 닉네임입니다.'
      });
    }

    newPasswordFirst(){
      Modal.error({
        title: '새로운 패스워드를 먼저 입력해 주세요.'
      });
    }

    uploadImage(){
      Modal.error({
        title: 'Image 파일만 업로드 가능합니다.'
      });
    }

    _submit(){
      const token = localStorage.getItem('token')
      const form = {
        userPassword : this.newPassword.value || undefined, 
        userName : this.nickname.value || this.state.data.name,
        userPhoto: this.state.imageAddress || this.state.data.user_photo,
        toneName : this.state.colorSelected || this.state.data.tone

      }
      this.state.validate === true && this.state.confirmNickname !== false && this.state.confirmPassword !== false && this.state.minNum !== false  ?  
        axios.post(`${url}/api/user/update/info`, form,  { headers: { 'token': token } })
        .then(response => {
          if(response.data.success){
            this.success()
          } else if(!response.data.success){
            this.error()
          }
        })
        .catch(err => console.log(err)) : this.error()
    }
      
    colorOptions = [
      { value: '모르겠어요', label: '모르겠어요' },
      {
          type: 'group', name: 'Cool tone', items: [
              { value: 'Summer', label: 'Summer' },
              { value: 'Winter', label: 'Winter' },
              { value: '쿨톤', label: '쿨톤' }
          ]
      },
      {
          type: 'group', name: 'Warm tone', items: [
              { value: 'Spring', label: 'Spring' },
              { value: 'Fall', label: 'Fall' },
              { value: '웜톤', label: '웜톤' }
          ]
      }
  ]

  render() {
      return (
        this.state.data ?
        <Container>
          <Header>내 정보 수정</Header>
          <Table>
            <Row>
              <Column>사진</Column>
              <Data>{this.state.hasPhoto ? <div><ProfPic src= {this.state.data.user_photo} /><Buttons onClick={this._photoChange}> 사진 변경</Buttons></div> 
                : <div><Dropzone onDropAccepted={ this._onDrop } onDropRejected={this.uploadImage} size={ 30 }  accept = "image/*">
                <div style={{width:'100%', height:'100%', textAlign:'center'}}>
                      <div style={{width:'100%', height:'100%', textAlign:'center'}}>
                      <div style={{color: 'black' ,fontWeight: 'bold'}}> 이미지 변경 클릭 </div>
                      {this.state.file ?
                        <ChangePic src= {this.state.imageAddress ? this.state.imageAddress : 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}  />
                        :<Img src={this.state.data.user_photo}/>}</div>
                          </div>
                          </Dropzone>
                        <Buttons onClick={this._photoChange}> 취소</Buttons></div>}
              </Data>
            </Row>
            <Row>
              <Column>이메일</Column>
              <Data>{this.state.data ? this.state.data.mail : null}</Data>
            </Row>
            <Row>
              <Column>닉네임</Column>
              <Data>
                  {this.state.nickName === false ? <div><Input value = {this.state.data ? this.state.data.name : null} ref={ref => { this.nickname = ref; }}  readOnly/> <Buttons onClick = {this._nickNameChange}>닉네임 변경</Buttons></div>
                  : <div><input style={{border: '0.5px solid #ccc'}}  defaultValue = {this.state.data.name} onBlur={this._nicknameOnchange} ref={ref => { this.nickname = ref; }}/><Buttons style={{marginLeft: '2%', marginRight: '2%'}} onClick = {this._confirmNickname}> 중복확인 </Buttons><Buttons onClick={this._nickNameChange}>변경취소</Buttons></div>}
              </Data>
            </Row>
            <Row>
              <Column>피부타입</Column>
              <Data>
                {!this.state.data ? null : this.state.tone === false ? this.state.data.tone : null}
                  {this.state.tone === false ? <Buttons onClick = {this._toneChange}style={{'margin-left': '15px'}}>피부타입 변경</Buttons> : null }
                {this.state.tone === true ? 
                  <div><Dropdown options={this.colorOptions} placeholder="USER'S PERSONAL COLOR" onChange={this._onColorSelect} value = {this.state.colorSelected} /> <Buttons onClick={this._toneChange}>변경취소</Buttons></div> 
                : null}
              </Data>
            </Row>              
            <Row>
              <Column>비밀번호</Column>
              <Data style={{height: 'auto !important'}}>
              <div>비밀번호는 5-10자 이내로 설정해주세요.</div>
                  <div>현재 비밀번호</div>
                  <input style={{border: '0.5px solid #ccc'}} onChange={this._passwordCompare} ref={ref => { this.password = ref; }}type='password'/>
                    {!this.password ? null : !this.password.value.length ? null : this.state.confirmPassword === true ? < div > Ok </div> :  this.state.confirmPassword === false ? <div>비밀번호 확인해주세요</div > : null}
                  <div>신규 비밀번호</div>
                  <input style={{border: '0.5px solid #ccc'}} onChange ={this._minNumber} ref={ref => { this.newPassword = ref; }} type='password'/>
                  {!this.newPassword ? null: !this.newPassword.value.length ? null : !this.state.minNum ? <div>비밀번호는 5글자 이상 입력하셔야 합니다.</div> : <div>Ok</div>}
                  <div>비밀번호 재입력</div>
                  <input style={{border: '0.5px solid #ccc'}} onClick={this._passwordInput} onChange = {this._comparePassword} ref={ref => { this.confirmPassword = ref; }} type='password'/>
                    {!this.confirmPassword && !this.newPassword ?  null : this.confirmPassword.value && this.newPassword.value ? <div>{this.state.validate === true ? '비밀번호가 일치합니다' : '입력한 비밀번호가 일치하지 않습니다'}</div>:null}
              </Data>
            </Row>
            <Row>
              <Column>성별</Column>
              <Data>{this.state.data ? this.state.data.gender : null}</Data>
            </Row>
            <Row>
              <Column>생년월일</Column>
              <Data>{this.state.data ? this.state.data.birth.split('T')[0] : null}</Data>
            </Row>
          </Table>
          <div style={{margin: ' 5% auto auto auto' , textAlign:'center'}}>
            <Buttons onClick={this._submit}> 
                변경 
            </Buttons>
              <Link to='/' style={{ textDecoration: 'none' }}> <Buttons>취소</Buttons> </Link>
          </div>
          
        
          </Container>
          : < Container > "Loading..." </Container>
        )
    }
}

export default MyInfo;