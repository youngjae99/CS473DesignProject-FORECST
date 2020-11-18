import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Login, Register, CampHome, CampQnA, CampRank, MainPage, MyPage} from './pages';
// import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import 'antd/dist/antd.css';
import {Switch, Route, BrowserRouter as Router, BrowserRouter} from "react-router-dom";
// import {browserHistory} from 'react-dom'
// import {createBrowserHistory} from 'history';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path='/' component={MainPage}></Route>
        <Switch>
          <Route component={Login} path="/login"/>
          <Route component={Register} path="/register"/>
          <Route component={CampHome} path="/camphome"/>
          <Route component={CampQnA} path="/campqna"/>
          <Route component={CampRank} path="/camprank"/>
          <Route component={MyPage} path="/mypage"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
