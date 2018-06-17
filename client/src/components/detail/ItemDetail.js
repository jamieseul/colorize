/* eslint-disable */
import React, {Component} from 'react';
import Chart from './Chart';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../../config';
import NumberFormat from 'react-number-format';
import LinesEllipsis from 'react-lines-ellipsis';
import Modal from 'react-modal';


const customStyles = {
  content: {
    width: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Wrapper = styled.div`
    height: 100%;
    width: 49.5vw;
    flex-direction: column;
    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
  	}
`;
const Top = styled.div`
    height: 20.5vw;
    margin-bottom : 1vw;
    width: 100%;
    display: flex;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 100%;
  	}
`;
const DetailDiv = styled.div`
  width: 20.3vw;
  margin-right:1vw;
  height: 100%;
  border : 1px solid black;
  background-color:white;
  box-sizing:border-box;
  text-align: left;
  font-size: 1rem;
  color: black;
  float: top;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    position: relative;
    border : none
    text-align: center;
    margin-top: 1%;
  }
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
const Brand = styled.div`
`;
const Category = styled.div`
  font-size: 0.8rem;
`;
const ColorName = styled.div`
  font-weight: bold;
  display: inline-block;
  color: #${props => props.color};
`;
const ColorBox = styled.div`
  background: #${props => props.color};
  width: 100%;
  height: 7px;
`;
const VolPrice = styled.div`
  display: flex;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Detail = styled.button `
  display: none;
  @media (max-width: 768px) {
    display: inline-block
    width: 100%;
    postion: absolute;
    bottom : 0;
    color: white;
    border: none;
    cursor: pointer;
    border: 0;
    outline:0;
    background-color: black;
    &:hover {
      text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    }
  }
`

const ChartDiv = styled.div`
  width: 60%;
  height: 100%;
  border: solid black 1px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top : 1%;
  }
`;
const Description = styled.div`
  width: 100%;
  height: 8.5vw;
  font-size : 1vw;
  border: solid black 1px;
  padding: 0.5vw;
  @media (max-width: 768px) {
      display: none;
  }
`;

const ModalDiv = styled.div`
  @media (max-width: 768px) {
    width: 60vw;
  }
`

class DetailRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      popupIsOpen: false,
    };
    this._openPopup = this._openPopup.bind(this);
    this._afterOpenPopup = this._afterOpenPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  componentDidMount() {
    axios.get(`${url}/api/item/get/rate?color_id=${this.props.id}`)
      .then(response => 
        this.setState({data: response.data.rows})
      )
      .catch(err => console.log(err));
  }

  _openPopup() {
    this.setState({ popupIsOpen: true });
  }

  _afterOpenPopup() {
    this.subtitle.style.color = 'black';
    this.title.style.color = 'grey';

  }

  _closePopup() {
    this.setState({ popupIsOpen: false });
  }


  render() {
    return (
      <Wrapper>
        <Top>
          <DetailDiv>
              <Name>{this.props.data ? this.props.data[0].name : null}</Name>
              <Brand>{this.props.data ? this.props.data[0].brand : null}</Brand>
              <Category>{this.props.data ? this.props.data[0].category : null}</Category>
              <ColorName color={this.props.data? this.props.data[0].hex : null}>{this.props.data ? this.props.data[0].color : null}
                <ColorBox color={this.props.data? this.props.data[0].hex : null}/>
              </ColorName>
              <VolPrice>
                <div>{this.props.data ? this.props.data[0].volume : null} /&nbsp; </div> 
                <NumberFormat value={this.props.data ? this.props.data[0].price : 0} displayType="text" thousandSeparator suffix="원" />
              </VolPrice>
              <Detail onClick={this._openPopup}>상세정보</Detail>
          </DetailDiv>
          <ChartDiv>
            <Chart data={this.state.data} />
          </ChartDiv>
        </Top>
        <Description>
          <LinesEllipsis
            text={`${this.props.data ? this.props.data[0].description : null}`}
            maxLine="3"
            ellipsis={<span style={{ cursor: 'pointer' }}onClick={this._openPopup}> ...더 보기...</span>}
            trimRight
            basedOn="words"/>
        </Description>

        <Modal
              isOpen={this.state.popupIsOpen}
              onAfterOpen={this._afterOpenPopup}
              onRequestClose={this._closePopup}
              style={customStyles}
              contentLabel="Description popup"
                >

              <h2 ref={subtitle => this.subtitle = subtitle}>상세 정보</h2>
              <ModalDiv innerRef={title => this.title = title}> {this.props.data ? this.props.data[0].description : null}</ModalDiv>
              <button style={{ cursor: 'pointer' }} onClick={this._closePopup}>close</button>
        </Modal>

      </Wrapper>
    );
  }
}

export default DetailRight;
