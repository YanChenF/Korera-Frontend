import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './Sidebar/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../containers/Login/Login';
import Signup from '../containers/Signup/Signup';
import Resource from '../containers/Resource';
import Project from '../containers/Project';
import Formula from '../containers/Formula';
import Template from '../containers/Template/Template';
import SideBarButton from './SideBarButton/SideBarButton';
import './main.css';
import { connect } from 'react-redux';
import { logout, checkAuthState, fetchResources, setColumns, fetchAttributeNames } from '../redux/actions/actionCreators';


class Main extends Component {
    componentDidMount() {
        this.props.checkAuthState();
        this.props.fetchResources(1);
        this.props.setColumns([
            {header: "RESOURCE NAME", accessor: "name"},
            {header: "RESOURCE CODE", accessor: "code"}
        ]);
        this.props.fetchAttributes(1);
    }

    state = {
        sideBarOpen: false, 
        style: {marginLeft: '0'}
    };

    toggleSideBar = () => {
        this.setState({sideBarOpen: !this.state.sideBarOpen,
        style: {marginLeft: this.state.style.marginLeft === '0' ?  '250px': '0'}});
    }

    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                    this.props.auth.isAuthenticated ? 
                    <Component {...props}/>
                    : 
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}/> 
                )}/>
            )
        return (
            <div style={{height: '100%'}}>
                <Header logout={this.props.logout} username={this.props.auth.user}
                project='Project 1'/>
                <SideBar show={this.state.sideBarOpen} /> 
                
                <div style={this.state.style} className="route">
                    <SideBarButton click={this.toggleSideBar} open={this.state.sideBarOpen}/>   
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <PrivateRoute exact path='/resource' component={Resource}/>
                        <PrivateRoute exact path='/project' component={Project}/>
                        <PrivateRoute exact path='/formula' component={Formula}/>
                        <PrivateRoute exact paht='/template' component={Template}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    checkAuthState: () => dispatch(checkAuthState()),
    setColumns: (columns) => dispatch(setColumns(columns)),
    fetchResources: (projectId) => dispatch(fetchResources(projectId)),
    fetchAttributes: (projectId) => dispatch(fetchAttributeNames(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);