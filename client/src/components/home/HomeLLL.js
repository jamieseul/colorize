import React from 'react';
import HomeColor from './HomeColor';
// import HomeTitle from './HomeTitle';
import styled from 'styled-components';
import tinycolor from "tinycolor2";
import { url } from '../../config';

const HomeContainer = styled.div`
    background-color: black;
    height:100vh;
    width:100vw;
    display: flex;
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
      .then(data => this.setState({data: data}))
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
        var lumArr = []; //array to store h values
        for(var i=0; i<dbItemHex.length; i++) {
          lumArr.push(tinycolor(dbItemHex[i].itemHex).getLuminance());
        }
        lumArr.sort(function(a, b){
          return b-a;
        });
        var splitArr = Math.round(lumArr.length/8);
        
        var idHexLum = JSON.parse(JSON.stringify(dbItemHex));
    
        for (var j=0; j<idHexLum.length; j++) {
          var color = tinycolor(idHexLum[j].itemHex) // tinycolor color format
          var hsl = color.toHsl(); //hsl format
          var h = hsl.h; // just need h for color sorting
          var lum = color.getLuminance(); // for lumniance sorting in each color group
          idHexLum[j].lum = lum;
          idHexLum[j].h = h;
          
          //sorting by color group
          if (lum<=lumArr[0] && lum>=lumArr[splitArr-1]) {
            this.colorGroup.A.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr-1] && lum>=lumArr[splitArr*2-1]) {
            this.colorGroup.B.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr*2-1] && lum>=lumArr[splitArr*3-1]) {
            this.colorGroup.C.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr*3-1] && lum>=lumArr[splitArr*4-1]) {
            this.colorGroup.D.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr*4-1] && lum>=lumArr[splitArr*5-1]) {
            this.colorGroup.E.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr*5-1] && lum>=lumArr[splitArr*6-1]) {
            this.colorGroup.F.push(idHexLum[j]);
          }
          else if (lum<lumArr[splitArr*6-1] && lum>=lumArr[splitArr*7-1]) {
            this.colorGroup.G.push(idHexLum[j]);
          }
          else {
            this.colorGroup.H.push(idHexLum[j]);
          }
          
          //sort by luminance high to low
          for(var key in this.colorGroup) {
            this.colorGroup[key].sort(function(obj1, obj2) {
              return obj2.h - obj1.h;
            })
          }
        }
      }
      
    render() {
        return (
            <HomeContainer>
                {/* <HomeTitle/> */}
                {this.state.isLoaded ? 
                <HomeColor colorGroup={this.colorGroup}/>
                :'Loading...'}
            </HomeContainer>     
        );
    }
};

export default Home;