import React, { useState, useEffect } from "react";
import "../App.css";
import Logout from './Logout'; // Import the Logout component


const sampleWords = [
  {
    word: "HELLO",
    description: "A common greeting to say hi.",
    difficulty: "easy",
  },
  {
    word: "WORLD",
    description: "The planet we live on, which is full of land and water.",
    difficulty: "easy",
  },
  {
    word: "JAVASCRIPT",
    description: "A popular programming language for building interactive websites and provides behavior to applications.",
    difficulty: "hard",
  },
  {
    word: "REACT",
    description: "A JavaScript library in which we have written this project code",
    difficulty: "medium",
  },
  {
    word: "PROGRAMMING",
    description: "The process of developing code to assist computers to perform tasks.",
    difficulty: "medium",
  },
];

const getRandomWord = (difficulty) => {
  const filteredWords = sampleWords.filter((word) => word.difficulty === difficulty);
  const randomPlace = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomPlace];
};

const GFGWordGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [wordData, setWordData] = useState(getRandomWord(difficulty));
  const [msg, setMsg] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [displayWord, setDisplayWord] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerId, setTimerId] = useState(null);

  const resetTimer = (newTimeLeft) => {
    clearInterval(timerId);
    setTimeLeft(newTimeLeft);
    const newTimerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(newTimerId);
          alert("Time's up!");
          restartGameFunction();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    resetTimer(difficulty === "easy" ? 60 : difficulty === "medium" ? 45 : 30);
    setWordData(getRandomWord(difficulty));
    return () => clearInterval(timerId);
  }, [difficulty]);

  useEffect(() => {
    if (wrongGuesses >= 3) {
      alert("Game Over! You made too many wrong guesses.");
      restartGameFunction();
    }
  }, [wrongGuesses]);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const letterSelectFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hintFunction = () => {
    if (hints > 0) {
      const hiddenLetterIndex = wordData.word.split("").findIndex((letter) => !chosenLetters.includes(letter));
      setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
      setHints(hints - 1);
    }
  };

  const removeCharacterFunction = () => {
    setChosenLetters(chosenLetters.slice(0, -1));
  };

  const displayLettersFunction = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => letterSelectFunction(letter)}
        disabled={chosenLetters.includes(letter)}
        className={`letter-button ${chosenLetters.includes(letter) ? "selected" : ""}`}
      >
        {letter}
      </button>
    ));
  };

  const checkWordGuessedFunction = () => {
    return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
  };

  const guessFunction = () => {
    if (checkWordGuessedFunction()) {
      setMsg("You have guessed the word correctly!");
      clearInterval(timerId);
    } else {
      setMsg("You made a Wrong Guess!. Try again!");
      setDisplayWord(true);
    }
  };

  const restartGameFunction = () => {
    setWordData(getRandomWord(difficulty));
    setMsg("");
    setChosenLetters([]);
    setHints(3);
    setDisplayWord(false);
    setWrongGuesses(0);
    resetTimer(difficulty === "easy" ? 60 : difficulty === "medium" ? 45 : 30);
  };

  if (!wordData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Word Guess Game</h1>
      <Logout /> {/* Add Logout component here */}
      <div>
        <label>Select Difficulty: </label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>Time Left: {timeLeft} seconds</div>
      <div className="word-container">
        {Array.from(wordData.word).map((letter, index) => (
          <div key={index} className={`letter ${chosenLetters.includes(letter) ? "visible" : ""}`}>
            {chosenLetters.includes(letter) ? letter : ""}
          </div>
        ))}
      </div>
      <p className="word-description">Hint: {wordData.description}</p>
      {msg && (
        <div className="message">
          <p>{msg}</p>
          {displayWord && <p>Correct word was: {wordData.word}</p>}
        </div>
      )}
      <div className="button-section">
        <div className="guess-section">
          <button onClick={restartGameFunction} className="restart-button">
            Restart
          </button>
          <button onClick={removeCharacterFunction} disabled={!chosenLetters.length} className="remove-button">
            Remove Letter
          </button>
        </div>
        <div className="letter-selection">
          {displayLettersFunction()}
        </div>
        <div className="hints">
          Hints Remaining: {hints}{" "}
          <button onClick={hintFunction} disabled={hints === 0} className="hint-button">
            Get Hint
          </button>
        </div>
        {!msg && (
          <button onClick={guessFunction} disabled={!chosenLetters.length} className="guess-button">
            Guess
          </button>
        )}
      </div>
    </div>
  );
};

export default GFGWordGame;