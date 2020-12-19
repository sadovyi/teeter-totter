import React from 'react';
import './button.css';

const Button = ({children}) => {
  return (
    <div className="circle-wrapper">
      <div className="warning circle">&nbsp;</div>
      <div className="icon">
        {children}
      </div>
    </div>
  );
};

export default Button;