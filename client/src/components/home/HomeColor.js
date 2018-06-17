import React, { Component } from 'react';
import TableDragSelect from "react-table-drag-select";
import styled from 'styled-components';

import { Modal } from 'antd';
import 'antd/dist/antd.css';
import './HomeColor.css';

import { withRouter } from 'react-router-dom';

const Buttons = styled.button`
  padding: 1% 2%;
  font-size: 1em;
  color: #fff;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #000000;
  margin: 1%;
  border: 0;
  outline:0;
  font-family: 'Roboto';
  font-weight: 300;
  &:hover {
    text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;
  }  
`

class HomeColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cells: this.cells,
        data: [],
    }
}

  handleChange = cells => this.setState({ cells });

  handleClick = () => {
    const cells = [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ];
    this.setState({ cells });
  };

  error() {
    Modal.info({
      title: '색상을 먼저 선택해주세요.',
      onOk() {},
    });
    
  }

  getID = () => {
    var link = '';
    var elements = document.getElementsByClassName("undefined cell-enabled cell-selected");
    for (var i=0; i<elements.length; i++) {
      link = link + elements[i].id + '&';
    }
   link = link.slice(0, -1);
    if(link.length === 0){
      this.error()
    } else {
      // window.location.assign(`/items/${link}?sort=rating`);
      this.props.history.push(`/items/${link}?sort=rating`)
    }
    // return <Link to ={`/items/${link}?sort=rating`}/>
  }

  cells = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  ];

  render() {
    this.colorGroup = this.props.colorGroup;
    return (
      <div className="HomeColor" style={{ backgroundColor:'white', margin:'20px 2% 2% 2%', width:'100%', heigth:'100%'}}>
        <div style={{ margin:'0% 5% 3% 5%'}}>
        <TableDragSelect style={{marginLeft:'auto', marginRight:'auto'}} value={this.state.cells} onChange={this.handleChange}>
          <tr>
              {this.colorGroup.A.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.B.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.C.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.D.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.E.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.F.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.G.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>
          <tr>
              {this.colorGroup.H.map((element, i) => 
                <td
                key={i}
                id={element.color_id}
                style={{backgroundColor: '#' + element.itemHex, width: '5vw', height: '7.5vh'}}>
                  <div className='heart'/>
                </td>
          )}
          </tr>

        </TableDragSelect>
        </div>
        <div style={{textAlign:'center'}}>
          <Buttons onClick={this.handleClick}>Reset</Buttons>
          <Buttons onClick={this.getID}>Search for these colors!</Buttons>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeColor);