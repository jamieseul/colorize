/* eslint-disable */
// Global import
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Local import
import neon from '../assets/neon.png';
import { Avatar } from 'antd';
import './Nav.css';

const NavContainer = styled.header`
  background-color: black;
  height: 70px;
  width: 100%;
  z-index:4;
  position: fixed
  top:0;
  -webkit-top: 0
  -webkit-overflow-scrolling: auto
  display: flex;
  flex-direction: row;
  transition: top 0.1s;
  align-items: center;
  @media (max-width: 768px) {
      height: 50px;
  }
`
const NavLink = styled(Link)`
`

const Logo = styled.img`
  object-fit: scale-down;
  max-width: 50%;
  max-height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const NavRightContainer = styled.div`
  // border: solid blue 3px;
  height: 100%;
  position: absolute;
  right: 15px;
  cursor: pointer;
  vertical-align: middle;
`
const Menu = styled.div`
  object-fit: scale-down;
  margin-left: 2%
	// border: solid red 3px;
`

const SideNav = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`

const SideAnchor = styled(Link)`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size:2.5vw
  font-size:calc(12px + 1.5vw);
  font-family: 'Roboto';
  font-weight: 200;
  color: white;
  display: block;
  transition: 0.3s;
  white-space: nowrap !important
  &:hover {
      color: white;
      text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
  }
`
const SideClose = styled.a`
  color: white;
  font: 2rem arial, sans-serif;
  position: absolute;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
}
`
 
const Overlay = styled.div`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:4;
  background-color: rgba(0,0,0,0.5);
  transition: 0.5s;
`

class Nav extends Component {
  constructor(props){
    super()
    this.state = {
      closeAll: false,
      isHide: false,
      item: [],
      selectedID: [],
      value: '',
    }
  }

  openNav = () => {
    ReactDOM.findDOMNode(this.refs.mySidenav).style.width = '22vw' 
    ReactDOM.findDOMNode(this.refs.overlay).style.display = 'block'
    if(document.body.clientWidth<='1024'){
      ReactDOM.findDOMNode(this.refs.mySidenav).style.width = '30vw' 
    }
    if(document.body.clientWidth<='414'){
      ReactDOM.findDOMNode(this.refs.mySidenav).style.width = '60vw' 
    }
    if(document.body.clientWidth<='375'){
      ReactDOM.findDOMNode(this.refs.mySidenav).style.width = '60vw' 
    }
  }

  closeNav = () => {
    ReactDOM.findDOMNode(this.refs.mySidenav).style.width = '0px'
    ReactDOM.findDOMNode(this.refs.overlay).style.display = 'none'

  }

  hideHeader= () => {
    var prevScrollpos = window.pageYOffset;
    
    return function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("navbar").style['-webkit-overflow-scrolling'] = 'touch'
      } else {
        document.getElementById("navbar").style.top = "-10%";
      }
      if(window.pageYOffset===0){
        document.getElementById("navbar").style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    }
  }

  componentDidMount(){
    window.addEventListener('scroll',this.hideHeader(), false);
  }

  render(){
      const { isLogined, handleLogout } = this.props
      return (        
        <NavContainer id="navbar">
        <Overlay ref='overlay' onClick={this.closeNav}/>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Logo src={neon} alt={"Colorize"}/>
        </NavLink>
        <Menu>
        <Avatar size="large" icon="user" onClick={this.openNav} />
        </Menu>
          <NavRightContainer>
              {isLogined ? 
              <SideNav ref="mySidenav" >
                <SideClose style={{textDecoration: 'none'}}href="javascript:void(0)" onClick={this.closeNav}>&times;</SideClose>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to="/" onClick={this.closeNav}>Home</SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to="/myinfo" onClick={this.closeNav}><nobr>My Info</nobr></SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to="/wishlist" onClick={this.closeNav}><nobr>Wish List</nobr></SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to="/review" onClick={this.closeNav}><nobr>My Review</nobr></SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to={this.props.location.pathname + this.props.location.search} onClick={()=>{this.closeNav(); handleLogout()}}>Logout</SideAnchor>
              </SideNav> :
              <SideNav ref="mySidenav" >
                <SideClose style={{textDecoration: 'none'}}onClick={()=>{this.closeNav()}}>&times;</SideClose>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to="/" onClick={()=>{this.closeNav();}}>Home</SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to={{pathname: "/login", state: {from: {pathname: '/myinfo'}}}} onClick={()=>{this.closeNav();}}>My Info</SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to={{pathname: "/login", state: {from: {pathname: '/wishlist'}}}} onClick={()=>{this.closeNav();}}>Wish List</SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' to={{pathname: "/login", state: {from: {pathname: '/review'}}}} onClick={()=>{this.closeNav();}}>My Review</SideAnchor>
                <SideAnchor style={{textDecoration: 'none'}}ref='Anchor' replace={false} to={{pathname: "/login", state: {from: this.props.location}} } onClick={()=>{this.closeNav();}}>Login</SideAnchor>
              </SideNav>
              }     
        </NavRightContainer>
      </NavContainer>
    );   
  }
};

export default withRouter(Nav)
