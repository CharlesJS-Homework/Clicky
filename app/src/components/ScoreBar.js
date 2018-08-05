import React, { Component } from 'react';

class ScoreBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      topScore: props.topScore,
      status: props.status
    };
  }

  render() {
    return (
      <nav className="ScoreBar">
        <ul>
          <li className="ScoreBar-title">Clicky Cat Game</li>
          <li className="ScoreBar-status">{ this.state.status }</li>
          <li className="ScoreBar-score">
            Score: { this.state.score } | Top Score: { this.state.topScore }
          </li>
        </ul>
      </nav>
    );
  }
}

export default ScoreBar;
