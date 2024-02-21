// Create 4 array for word
// create function to random array then random worlds in selected array
// create span for selected world and push it in output-fields
// create function to check if clicked letter is available in array word
// if available create function to check index of letter and push it to index of span
// else create function to start hangman draw step by

// Arrays for different word categorie
let country = [
  "Yemen",
  "Syria",
  "Egypt",
  "Lubnan",
  "Palestine",
  "Jordan",
  "Libya",
];
let animals = [
  "Snake",
  "Lion",
  "Tiger",
  "Elephant",
  "Leopard",
  "Giraffe",
  "Cow",
];
let fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Grape",
  "Pineapple",
  "Watermelon",
  "Strawberry",
];
let colors = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black"];

// Array containing all word arrays

let allArrays = [country, animals, fruits, colors];

// Object mapping category names
let object = { country, animals, fruits, colors };

// Get the score text element
let scoreText = document.querySelector(".header").children[1];
let scoreCount = 0;

// Check if there is a saved score in the session storage
if (sessionStorage.getItem("score") != null) {
  scoreText.textContent = `Score: ${sessionStorage.getItem("score")}`;
  scoreCount = sessionStorage.getItem("score");
}

// Function to select a random word from a random array
function randomArrayAndWord(selectedWord) {
  let randomArrayIndex = Math.floor(Math.random() * allArrays.length);
  let randomWordIndex = Math.floor(
    Math.random() * allArrays[randomArrayIndex].length
  );
  selectedWord = allArrays[randomArrayIndex][randomWordIndex];
  // console.log(selectedWord);
  let selectedCategory = Object.keys(object)[randomArrayIndex];
  // Display the selected word category in the header
  let selectedWordGroup = document.querySelector(".header").children[2];
  // insert selected name group to header
  selectedWordGroup.textContent = `World From : ${selectedCategory}`;
  return selectedWord;
}

// Create the output fields based on the selected word length
let outputFields = document.querySelector(".output-fields");

// Create input fields from selected word length
let selectedWord = randomArrayAndWord();
function createOutputFields() {
  for (let i = 0; i < selectedWord.length; i++) {
    let span = document.createElement("span");
    outputFields.appendChild(span);
  }
  return selectedWord.length;
}
createOutputFields();

let letters = document.querySelector(".letters");
let selectedWordLength = selectedWord.length;
let currentWordLength = 0;
let inCorrectselectedLimit = 7;
let inCorrectselectedCount = 0;
let theDraw = document.querySelector(".the-draw");

// check clicked letter is available in selected word
function checkClickedLetter() {
  Array.from(letters.children).forEach((ele, index) =>
    ele.addEventListener("click", function () {
      let regex = new RegExp(ele.textContent, `i`);

      if (regex.test(selectedWord)) {
        var audio = new Audio("correct.mp3");
        audio.play();
        for (let i = 0; i < selectedWord.length; i++) {
          let convertLetters = selectedWord[i].toLowerCase();
          let currentLetter = ele.textContent.toLowerCase();
          if (convertLetters.includes(currentLetter)) {
            playSound("correct.mp3");
            currentWordLength++;

            // insert selected letter with correct index in span
            outputFields.children[i].textContent = ele.textContent;
            ele.classList.add("true-letter");
          }
        }
      } else {
        playSound("wrong.mp3");

        ele.classList.add("false-letter");
        theDraw.children[inCorrectselectedCount].style.display = "block";
        inCorrectselectedCount++;

        if (inCorrectselectedCount == inCorrectselectedLimit) {
          Array.from(letters.children).forEach((ele) => {
            ele.classList.add("pointer-events");
          });
          loseOrWin(false);
        }
      }

      // check if output fileds are not empty
      if (currentWordLength == selectedWordLength) {
        scoreCount++;

        loseOrWin(true);
      }
    })
  );
}
// Function to manage sound effects
function playSound(soundFile) {
  var audio = new Audio(soundFile);
  audio.play();
}

function loseOrWin(win) {
  let result = document.querySelector(".result");

  if (win) {
    playSound("applause.mp3");
    result.children[0].textContent = "YOU WIN!";
    result.children[0].style.color = "rgb(96 255 0)";
    result.children[1].textContent = `The World Is : ${selectedWord}`;
    scoreText.textContent = `Score: ${scoreCount}`;

    Array.from(letters.children).forEach((ele) => {
      ele.classList.add("pointer-events");

      sessionStorage.setItem("score", scoreCount);
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    setTimeout(() => {
      playSound("game-over.mp3");
    }, 1000);

    sessionStorage.clear();
    result.children[0].textContent = "YOU LOSE!";
    result.children[0].style.color = "red";
    result.children[1].textContent = `The World Is : ${selectedWord}`;
  }
}
checkClickedLetter();
