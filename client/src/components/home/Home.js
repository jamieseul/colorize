import React from 'react';
import HomeColor from './HomeColor';
// import HomeTitle from './HomeTitle';
import styled from 'styled-components';
import tinycolor from "tinycolor2";
import { url } from '../../config';


const HomeContainer = styled.div`
  background-color: white;
  width:100%;
  display: flex;
  margin-top: 70px;
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
  align-items: center;
  justify-content: center
`
const Loading = styled.div`
    align-content: center
    margin-top: 250px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid black;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @media (max-width: 320px) {
      margin-top: 150px;
    }
    @media (max-width: 375px) {
      margin-top: 125px;
    }
    @media (max-width: 414px) {
      margin-top: 120px;
    }
`

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false
        }
    }
    
    componentDidMount(){
      
      fetch(`${url}/api/color/get`)
      .then(response => response.json())
      .then(data =>{
        this.setState({data:data.rows})} )
      .then(() => this.sortColorGroup(this.state.data))
      .then(() => this.setState({isLoaded: true}))
  }

    colorGroup = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: []
      }
      
      sortColorGroup(dbItemHex) {
        var hArr = []; //array to store h values
        for(var i=0; i<dbItemHex.length; i++) {
          hArr.push(tinycolor(dbItemHex[i].itemHex).toHsl().h);
        }
        hArr.sort(function(a, b){
          return a-b;
        });
        var splitArr = Math.round(hArr.length/8);
        
        var idHexLum = JSON.parse(JSON.stringify(dbItemHex));
    
        for (var j=0; j<idHexLum.length; j++) {
          var color = tinycolor(idHexLum[j].itemHex) // tinycolor color format
          var hsl = color.toHsl(); //hsl format
          var h = hsl.h; // just need h for color sorting
          var lum = color.getLuminance(); // for lumniance sorting in each color group
          idHexLum[j].lum = lum;
          idHexLum[j].h = h;
          
          //sorting by color group
          if (h>=hArr[0] && h<=hArr[splitArr-1]) {
            this.colorGroup.A.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr-1] && h<=hArr[splitArr*2-1]) {
            this.colorGroup.B.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr*2-1] && h<=hArr[splitArr*3-1]) {
            this.colorGroup.C.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr*3-1] && h<=hArr[splitArr*4-1]) {
            this.colorGroup.D.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr*4-1] && h<=hArr[splitArr*5-1]) {
            this.colorGroup.E.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr*5-1] && h<=hArr[splitArr*6-1]) {
            this.colorGroup.F.push(idHexLum[j]);
          }
          else if (h>hArr[splitArr*6-1] && h<=hArr[splitArr*7-1]) {
            this.colorGroup.G.push(idHexLum[j]);
          }
          else {
            this.colorGroup.H.push(idHexLum[j]);
          }
          
          //sort by luminance high to low
          for(var key in this.colorGroup) {
            this.colorGroup[key].sort(function(obj1, obj2) {
              return obj2.lum - obj1.lum;
            })
          }
        }
      }
      
    render() {
        return (
            <HomeContainer>
              {this.state.isLoaded ?
              <HomeColor colorGroup={this.colorGroup}/>
              :<Loading />}
            </HomeContainer>     
        );
    }
};

export default Home;