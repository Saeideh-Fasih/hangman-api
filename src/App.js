import React, { useState, useEffect } from "react";
import "./App.css";
import Hangman from "./components/Hangman";

function App() {
  const [randomWord, setRandomWord] = useState("");
  const [worts, setWorts] = useState([]);

  useEffect(() => {
    fetchRandomWords();
  }, []);

  useEffect(() => {
    if(worts.length)
    setWord();
  },[worts])

  async function fetchRandomWords() {
    const url =
      // "https://api.themoviedb.org/3/movie/popular?api_key={apikey}&language=en-US";
      "https://my.api.mockaroo.com/cars_brand.json?key=0af2ff30";
    const response = await fetch(url);
    const data = await response.json();
    let temporaryArray = [];
    data.forEach((carBrand) => {
      temporaryArray.push(carBrand.id);
    });
    setWorts(temporaryArray);
  }

  function setWord() {
    let temporaryRandomWord = "";
    temporaryRandomWord = worts[Math.floor(Math.random() * worts.length)];
    setRandomWord(temporaryRandomWord.toLowerCase());
  }

  return (
    <div className="App">
      <Hangman randomWord={randomWord} setWord={setWord} />

    </div>
  );
}

export default App;
