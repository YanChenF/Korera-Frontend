import React from 'react';
// import NavBar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import './header.css';

export default (props) => {
        return (
            <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__logo">THE LOGO</div>
                <div className="spacer" ><h3>{props.project}</h3></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><i className="far fa-user-circle fa-2x"></i></li>
                        <li>{props.username}</li>
                        <li><i className="far fa-question-circle fa-2x"></i></li>
                        <li><button onClick={props.logout}>Logout</button></li>
                    </ul>
                </div>
            </nav>
            
          </header>

        );
    }
