"use strict";

//Selecting elements:
const player1SectionElement = document.querySelector(".player1-section");
const player2SectionElement = document.querySelector(".player2-section");
const totalScore1Element = document.getElementById("total-score-1");
const totalScore2Element = document.getElementById("total-score-2");
const roundScore1Element = document.getElementById("round-score-1");
const roundScore2Element = document.getElementById("round-score-2");

const diceElement = document.querySelector(".dice-img");
const buttonRoll = document.querySelector(".button-roll");
const buttonHold = document.querySelector(".button-hold");
const buttonNew = document.querySelector(".button-new");

let scores, roundScore, activePlayer, playingGame;

const initialSettings = function () {
  //Starting condtitions
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 1;
  playingGame = true;
  totalScore1Element.textContent = 0;
  totalScore2Element.textContent = 0;
  roundScore1Element.textContent = 0;
  roundScore2Element.textContent = 0;
  document.querySelector(".winner-section").classList.add("hidden");
  player1SectionElement.classList.add("player-active");
  player2SectionElement.classList.remove("player-active");
  //Showing question dice agan
  diceElement.src = "./images/dice-random.png";
};

initialSettings();

const switchPlayer = function () {
  //Switch to a next player
  //Setting scores for an active player to 0
  document.getElementById(`round-score-${activePlayer}`).textContent = 0;
  //Round score znowu muszą być reset to zero
  roundScore = 0;
  //Showing question dice agan, when changing players
  diceElement.src = "./images/dice-random.png";
  //Switching players
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1SectionElement.classList.toggle("player-active");
  player2SectionElement.classList.toggle("player-active");
};

//Rolling dice functionality
buttonRoll.addEventListener("click", function () {
  if (playingGame) {
    //Hiding a random dice picture
    diceElement.classList.add("hidden");

    //1. Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    //2. Display the dice
    diceElement.classList.remove("hidden");
    diceElement.src = `./images/dice-${diceNumber}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (diceNumber !== 1) {
      //Add dice to a round score
      roundScore += diceNumber;
      document.getElementById(`round-score-${activePlayer}`).textContent =
        roundScore;
    } else {
      //Switch to a next player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playingGame) {
    //1. Add current score to active player's total score
    if (activePlayer === 1) {
      scores[0] += roundScore;
      document.getElementById(`total-score-${activePlayer}`).textContent =
        scores[0];
      //Checking if scores are 100 or more
      //If "Yes" then we have a winner
      if (scores[0] >= 100) {
        playingGame = false;
        //Showing question dice agan, when finishing game
        diceElement.src = "./images/dice-random.png";
        player1SectionElement.classList.toggle("player-active");
        document.querySelector(".winner-text").textContent =
          "Player 1 is the winner!";
        document.querySelector(".winner-section").classList.remove("hidden");
        //If "NOT" then switch players
      } else {
        switchPlayer();
      }
    } else {
      scores[1] += roundScore;
      document.getElementById(`total-score-${activePlayer}`).textContent =
        scores[1];
      if (scores[1] >= 100) {
        playingGame = false;
        //Showing question dice agan, when finishing game
        diceElement.src = "./images/dice-random.png";
        player2SectionElement.classList.toggle("player-active");
        document.querySelector(".winner-text").textContent =
          "Player 2 is the winner!";
        document.querySelector(".winner-section").classList.remove("hidden");
      } else {
        switchPlayer();
      }
    }
  }
});

//Resetting game
buttonNew.addEventListener("click", initialSettings);
