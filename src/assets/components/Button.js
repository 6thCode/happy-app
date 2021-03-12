import React from 'react';
import "../../styles/App.scss";

function Button(props) {
  return (
    <>
      <button className="main-button" 
        onClick={props.handleClick}>
        {props.title}
      </button>
    </>
  );
}

export default Button;