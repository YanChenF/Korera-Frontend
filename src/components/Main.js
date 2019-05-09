import React, { Component } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import { Switch, Route } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Resource from '../containers/Resource';
import Project from '../containers/Project';
import Formula from '../containers/Formula';

export default class Main extends Component {
    render() {
        return (
            <>
                <Header />
                <SideBar />
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={Signup}/>
                    <Route path='/resource' component={Resource}/>
                    <Route path='/project' component={Project}/>
                    <Route path='/formula' component={Formula}/>
                </Switch>
            </>
        );
    }
}