import React, { Component } from 'react';
import Header from './components/Header';
import ScoreBar from './components/ScoreBar';

import './App.css';
import catalog from './cat-alog.json';

const atOnce = 12;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      unguessed: this.allCats(),
      guessed: [],
      score: 0,
      topScore: 0,
      over: false,
      status: 'Click a cat to begin!'
    };
  }

  scoreboardKey = 0
  
  meowSound = null;
  winSound = null;
  loseSound = null;

  allCats = () => {
    const catCount = catalog.catCount;

    return Array(catCount).fill().map((_, i) => `/img/cats/cat${i}.jpg`);
  }

  catClicked = (event) => {
    const cat = event.currentTarget.getAttribute('src');

    let score;

    if (this.state.over) {
      this.setState({
        over: false,
        unguessed: this.allCats(),
        guessed: [],
        sound: null
      });

      score = 0;
    } else {
      score = this.state.score;
    }

    if (this.state.guessed.includes(cat)) {
      this.lose(score);
    } else {
      score += 1;

      const newGuessed = this.state.guessed.concat([cat]);
      const newUnguessed = this.state.unguessed.filter(c => c !== cat);
      
      this.setState({
        score: score,
        guessed: newGuessed,
        unguessed: newUnguessed
      });

      if (newUnguessed.length === 0) {
        this.win(score);
      } else {
        this.setState({ status: '😺 😺 😺 Meow! 😺 😺 😺'})
        this.meowSound.play();
      }
    }
  }

  win = (score) => {
    this.winSound.play();

    this.setState({
      over: true,
      status: '😸 😸 😸 YOU WIN!!! 😸 😸 😸',
      sound: '/snd/purr.mp3'
    })

    this.updateTopScore(score);
  }

  lose = (score) => {
    this.loseSound.play();

    this.updateTopScore(score);

    this.setState({
      over: true,
      status: '😾 😾 😾 MRROW!!! (Scratch, Hiss) 😾 😾 😾',
      sound: '/snd/angry_cat.mp3'
    });
  }

  updateTopScore = (score) => {
    if (score > this.state.topScore) {
      this.setState({ topScore: score });
    }
  }

  loadCats = () => {
    const minGuessed = Math.max(0, atOnce - this.state.unguessed.length);
    const maxGuessed = Math.min(atOnce - 1, this.state.guessed.length);
    const guessedCount = minGuessed + Math.floor(Math.random() * (maxGuessed - minGuessed));
    const unguessedCount = atOnce - guessedCount;

    const guessed = this.sample(this.state.guessed, guessedCount);
    const unguessed = this.sample(this.state.unguessed, unguessedCount);

    const cats = this.shuffle(guessed.concat(unguessed));
    
    return (
      <ul className="CatList">
        { cats.map(cat => (
          <li className="Cat" key={cat} src={cat} onClick={ this.catClicked }>
            <img
              src={cat}
              alt="Adorable Cat"
            />
          </li>
        ))}
      </ul>
    );
  }

  loadSounds = () => {
    return (
      <div>
        <audio ref={self => { this.meowSound = self; }}>
          <source src="/snd/meow.mp3" type="audio/mpeg">
          </source>
        </audio>
        <audio ref={self => { this.winSound = self; }}>
          <source src="/snd/purr.mp3" type="audio/mpeg">
          </source>
        </audio>
        <audio ref={self => { this.loseSound = self; }}>
          <source src="/snd/angry_cat.mp3" type="audio/mpeg">
          </source>
        </audio>
      </div>
    );
  }

  shuffle = (array) => {
    let shuffled = array.slice();

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  sample = (array, count) => {
    if (count === 0) {
      return [];
    }

    return this.shuffle(array).slice(0, count);
  }

  render() {
    return (
      <div className="Game">
        <ScoreBar
          key={ this.scoreboardKey++ }
          score={ this.state.score }
          topScore={ this.state.topScore }
          status={ this.state.status }
        />
        <Header />
        { this.loadCats() }
        { this.loadSounds() }
      </div>
    );
  }
}

export default App;
