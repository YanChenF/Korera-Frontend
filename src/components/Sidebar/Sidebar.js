import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar/Sidebar.css';

const SideBar = (props) => {
    // const classes = ['side-drawer'];

    
    let classes = props.show ? 'side-drawer open': 'side-drawer';
    
    return (<nav className={classes}>
                <ul>
                    <li><NavLink to="/resource" className="menu-item">Resource</NavLink></li>
                    <li><NavLink to="/project" className="menu-item">Project</NavLink></li>
                    <li><NavLink to="/formula" className="menu-item">Formula</NavLink></li>
                </ul>
            </nav>);
    
}

export default SideBar;

