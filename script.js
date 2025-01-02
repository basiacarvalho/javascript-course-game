"use strict";

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

  diceElement.src = "./images/dice-random.png";
};

initialSettings();

const switchPlayer = function () {
  document.getElementById(`round-score-${activePlayer}`).textContent = 0;
  roundScore = 0;
  diceElement.src = "./images/dice-random.png";
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1SectionElement.classList.toggle("player-active");
  player2SectionElement.classList.toggle("player-active");
};

buttonRoll.addEventListener("click", async function () {
  if (playingGame) {
    diceElement.classList.add("hidden");

    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `./images/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      roundScore += diceNumber;
      document.getElementById(`round-score-${activePlayer}`).textContent =
        roundScore;
    } else {
      await new Promise((r) => setTimeout(r, 1000));
      switchPlayer();
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playingGame) {
    if (activePlayer === 1) {
      scores[0] += roundScore;
      document.getElementById(`total-score-${activePlayer}`).textContent =
        scores[0];
      if (scores[0] >= 100) {
        playingGame = false;
        diceElement.src = "./images/dice-random.png";
        player1SectionElement.classList.toggle("player-active");
        document.querySelector(".winner-text").textContent =
          "Player 1 is the winner!";
        document.querySelector(".winner-section").classList.remove("hidden");
      } else {
        switchPlayer();
      }
    } else {
      scores[1] += roundScore;
      document.getElementById(`total-score-${activePlayer}`).textContent =
        scores[1];
      if (scores[1] >= 100) {
        playingGame = false;
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

buttonNew.addEventListener("click", initialSettings);
