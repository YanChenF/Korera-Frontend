import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './Sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';
import Login from '../containers/Login/Login';
import Signup from '../containers/Signup/Signup';
import Resource from '../containers/Resource';
import Project from '../containers/Project';
import Formula from '../containers/Formula';
import SideBarButton from './SideBarButton/SideBarButton';
import './main.css';

export default class Main extends Component {
    state = {
        sideBarOpen: false, 
        style: {marginLeft: '0'}
    };

    toggleSideBar = () => {
        this.setState({sideBarOpen: !this.state.sideBarOpen,
        style: {marginLeft: this.state.style.marginLeft === '0' ?  '250px': '0'}});
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Header />
                <SideBar show={this.state.sideBarOpen} /> 
                
                <div style={this.state.style} className="route">
                    <SideBarButton click={this.toggleSideBar} open={this.state.sideBarOpen}/>   
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <Route path='/resource' component={Resource}/>
                        <Route path='/project' component={Project}/>
                        <Route path='/formula' component={Formula}/>
                    </Switch>
                </div>

            </div>
        );
    }
}