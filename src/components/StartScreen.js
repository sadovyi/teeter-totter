import React from 'react';
import Menu from "../shared/Menu";
import Button from "../shared/Button";
import {Link} from "react-router-dom";

const StartScreen = () => {
  return (
    <Menu title='Main menu' description='Welcome to our game'>
      <h6>You maximum score:</h6>
      <a href="!#">Choose level</a>
      <Link to='game'>
        <Button>!</Button>
      </Link>
    </Menu>
  );
};

export default StartScreen;