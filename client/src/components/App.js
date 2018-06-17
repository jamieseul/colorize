/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {injectGlobal} from 'styled-components'
import styled from 'styled-components';
import Nav from '../components/Nav'
import Home from './home/Home'
import ItemList from './itemList/ItemList'
import NotMatch from './NotMatch'
import WishList from './wishList/WishList'
import MyContent from './review/MyContent'
import MyReviews from './review/MyReviews'
import Signup from './user/Signup'
import Detail from './detail/Detail'
import MyInfo from './MyInfo'

import axios from 'axios';
import { url } from '../config';
import Login from './user/Login'
import history from '../utils/history'


injectGlobal`
  body{
    padding: 0;
    margin:0;
  }
`
const Wrapper = styled.div`
    position: relative
    width: 100vw
    height: 100vh
`

const Loading = styled.div`
    // position: absolute
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // margin: 0 auto;
    width: 60vw;
    height: 60vh;
    margin: 35vh auto;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid black;
    width: 120px
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @media (max-width: 768px) {
        margin: 35vh auto;
        width: 60px
        height: 60px;
    }
`

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
     <Route {...rest} render={(props) => {
        const {isLoading, isLogined} = rest         
        return isLoading ? <Wrapper> <Loading/> </Wrapper> 
                : isLogined ?
                <Component {...props} {...rest} />
                : <Redirect to ={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
     }} />
 )}

class App extends Component {
    constructor(){
        super()
        this.state = {
            isLogined: false,
            isLoading: true
        }
    }

    handleLoginUser = () => {
        this.setState({
            isLogined: true
        })
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        this.setState({
            isLogined: false
        })
        history.push(history.location)
    }

    componentDidMount(){        
        const token = localStorage.getItem('token')
        console.log('tokentokentokentoken', token);
        console.log('호출됨');
            axios.get(`${url}/api/user/get/check`, {headers: {'token': token}})
            .then(res => {
                console.log('resresresresresres',res);
                if(res.data.success === true){
                    this.setState({
                        isLoading: false,
                        isLogined: true
                    })
                } else{
                    this.handleLogout()
                    this.setState({
                        isLogined: false
                    })
                }
            })
    }
        
    render() {        
        const {isLoading, isLogined} = this.state
        console.log(isLogined);
        
        return (
            <Router>
                <div>
                <Nav isLogined={isLogined} handleLogout={this.handleLogout}/>   
                    <Switch> 
                        <Route exact path="/" component={Home}/>
                        <Route path="/signup" component={Signup}/>
                        <Route exact path="/items/:id" component={ItemList}/>
                        <Route path="/login" 
                        render={(props)=><Login handleLoginUser={this.handleLoginUser}/>}/>
                        <Route path="/items/detail/:id" 
                        render={(props)=><Detail {...props} handleLogout={this.handleLogout} isLogined={isLogined}/>} />
                        <PrivateRoute path="/myinfo" isLoading={isLoading} isLogined={isLogined} handleLogout={this.handleLogout} handleLoginUser={this.handleLoginUser} component={MyInfo}/>
                        <PrivateRoute path='/review' isLoading={isLoading} isLogined={isLogined} handleLogout={this.handleLogout}  handleLoginUser={this.handleLoginUser} component={MyReviews} />
                        <PrivateRoute path='/wishlist' isLoading={isLoading} isLogined={isLogined} handleLogout={this.handleLogout} handleLoginUser={this.handleLoginUser} component={WishList} />
                    </Switch>    
                </div>
            </Router>
        );
    }
}

export default App;



