import React, { Component } from "react";
import "./Hangman.css";

import step0 from "../img/1.png";
import step1 from "../img/2.png";
import step2 from "../img/3.png";
import step3 from "../img/4.png";
import step4 from "../img/5.png";
import step5 from "../img/6.png";
import step6 from "../img/7.png";

class Hangman extends Component {
  //Upload all images in the component
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: "",
    };
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
      <button
        className="btn btn-lg btn-primary m-2"
        key={letter + index}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      //if the guess letter isn't inside the answer:  add 1 to mistake
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: this.props.randomWord,
      gameOver: false,
      isWinner: false,
    });

    this.props.setWord();
  };

startGame = () =>{

}

  render() {
    console.log("Answer: " + this.props.randomWord);
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!";
    }

    if (gameOver) {
      gameStat = "You Lost!!!";
    }

    return (
      <div className="Hangman container">
        <h1 className="text-center">Hangman</h1>
        <div className="float-right">
          Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
        </div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt="" />
        </div>
        <div className="text-center">
          <p>Guess the Car brand:</p>
          <p>{!gameOver ? this.guessedWord() : this.state.answer}</p>
          <p>{gameStat}</p>
          <button className="btn btn-info" onClick={this.resetButton}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
