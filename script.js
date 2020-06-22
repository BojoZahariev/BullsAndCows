var aiNum = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
var playerNum = [];
var myGuess = [];
let aiGuess = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
//let aiGuess = [];
let aiHelpGuess = ['', '', '', ''];
myNumber = [1, 2, 3, 4];
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var bulls = 0;
var cows = 0;
var bulls2 = 0;
var cows2 = 0;
const numbersForm = document.querySelector('#numbersForm');
const submitBtn = document.querySelector('#submitBtn');

var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var n3 = document.querySelector('#n3');
var n4 = document.querySelector('#n4');

var aiNumberText = document.querySelector('#aiNumberText');
var myNumberText = document.querySelector('#myNumberText');
var myGuessText = document.querySelector('#myGuessText');

const result = document.querySelector('#result');
const result2 = document.querySelector('#result2');

aiNumberText.textContent = aiNum;
myNumberText.textContent = myNumber;

submitBtn.addEventListener('click', e => {
  res();
  myGuess = [Number(n1.value), Number(n2.value), Number(n3.value), Number(n4.value)];
  myGuessText.textContent = myGuess;

  getAiNumber();

  compare(aiNum, myGuess);

  compareAi(myNumber, aiGuess);
  numbersForm.reset();

  console.log(`aiHelpGuess ${aiHelpGuess}`);
  console.log(`aiGuess ${aiGuess}`);
});

const compare = (arr1, arr2) => {
  for (i = 0; i < arr2.length; i++) {
    if (arr2[i] === arr1[i]) {
      bulls += 1;
    } else if (arr1.indexOf(arr2[i]) !== -1) {
      cows += 1;
    }
  }

  result.textContent = `bulls: ${bulls} cows: ${cows}`;
};

const compareAi = (arr1, arr2) => {
  for (i = 0; i < arr2.length; i++) {
    if (arr2[i] === arr1[i]) {
      aiHelpGuess[i] = arr2[i];
      bulls2 += 1;
    } else if (arr1.indexOf(arr2[i]) !== -1) {
      cows2 += 1;
    } else if (arr1.indexOf(arr2[i]) === -1) {
      myArray.splice(arr2[i], 1);
    }
  }

  result2.textContent = `Ai bulls: ${bulls2} cows: ${cows2}`;
};

const getAiNumber = () => {
  for (i = 0; i < aiHelpGuess.length; i++) {
    if (aiHelpGuess[i] === '') {
      aiGuess[i] = randomNumber();
    } else {
      aiGuess[i] = aiHelpGuess[i];
    }
  }
};

const res = () => {
  bulls = 0;
  cows = 0;
  bulls2 = 0;
  cows2 = 0;
};

const randomNumber = () => {
  console.log(myArray);
  return myArray[Math.floor(Math.random() * myArray.length)];
};

randomNumber();
