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

// id = "player-name-1";

//Starting condtitions
totalScore1Element.textContent = 0;
totalScore2Element.textContent = 0;

const scores = [0, 0];
let roundScore = 0;
let activePlayer = 1;

//Rolling dice functionality
buttonRoll.addEventListener("click", function () {
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
    //Setting scores for an active player to 0
    document.getElementById(`round-score-${activePlayer}`).textContent = 0;
    //Round score znowu muszą być reset to zero
    roundScore = 0;
    //Switching players
    activePlayer = activePlayer === 1 ? 2 : 1;
    player1SectionElement.classList.toggle("player-active");
    player2SectionElement.classList.toggle("player-active");
  }
});
