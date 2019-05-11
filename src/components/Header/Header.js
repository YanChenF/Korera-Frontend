import React, { Component } from 'react';
// import NavBar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import './header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__logo"><a >THE LOGO</a></div>
                <div className="spacer" />
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><i className="far fa-user-circle fa-2x"></i></li>
                        <li><i className="far fa-question-circle fa-2x"></i></li>
                    </ul>
                </div>
            </nav>
            
          </header>

        );
    }
}

{/* <NavBar bg="light" expand="lg">
<NavBar.Brand >Resource Management</NavBar.Brand>
<NavBar.Collapse>
    <Nav className="mr-auto"></Nav>
    <Nav>
        <Nav.Link><i className="far fa-user-circle fa-2x"></i></Nav.Link>
        <Nav.Link><i className="far fa-question-circle fa-2x"></i></Nav.Link>
    </Nav>
</NavBar.Collapse>
</NavBar> */}