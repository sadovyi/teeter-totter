import React from 'react';
import './menu.css';

const Menu = ({title, description, children}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default Menu;