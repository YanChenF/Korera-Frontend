import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SideBar extends Component {
    render() {
        return (<div>
            <NavLink to="/resource">Resource</NavLink>
            <NavLink to="/project">Project</NavLink>
            <NavLink to="/formula">Formula</NavLink>
        </div>);
    }
}