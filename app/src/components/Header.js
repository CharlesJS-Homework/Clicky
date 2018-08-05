import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header-title">Clicky Game!</h1>
        <h2 className="Header-desc">Click on an image to earn points, but don't click on any more than once!</h2>
      </header>
    );
  }
}

export default Header;