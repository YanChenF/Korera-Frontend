import React from 'react';
import './button.css';

const SideBarButton = (props) => {
    let content = props.open ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>
    return (
        <button onClick={props.click} className="button">
            {content}
        </button>
    );
}

export default SideBarButton;