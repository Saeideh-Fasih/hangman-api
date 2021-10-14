import React, { useState, useEffect } from "react";
import "./App.css";
import Hangman from "./components/Hangman";

function App() {
  const [randomWord, setRandomWord] = useState("");
  useEffect(() => {
    fetchRandomWords();
  }, []);

  async function fetchRandomWords() {
    const url =
     // "https://api.themoviedb.org/3/movie/popular?api_key={apikey}&language=en-US";
     "https://my.api.mockaroo.com/cars_brand.json?key=0af2ff30";
    const response = await fetch(url);
    const data = await response.json();
    let temporaryArray = [];
    let temporaryRandomWord = "";
    data.forEach((movieTitle) => {
      temporaryArray.push(movieTitle.id);
    });
    temporaryRandomWord = setWord(temporaryArray);
    setRandomWord(temporaryRandomWord.toLowerCase());
    return;
  }

  function setWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return (
    <div className="App">
      <Hangman randomWord={randomWord} />
    </div>
  );
}

export default App;
