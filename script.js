const initialDiv = document.querySelector('#initialDiv');
const startBtn = document.querySelector('#startBtn');
const gameDiv = document.querySelector('#gameDiv');
const resultsDiv = document.querySelector('#resultsDiv');
const winScreen = document.querySelector('#winScreen');

const submitBtn1 = document.querySelector('#submitBtn1');
const submitBtn2 = document.querySelector('#submitBtn2');
const submitBtn3 = document.querySelector('#submitBtn3');

const myNumberText = document.querySelector('#myNumberText');
const myGuessText = document.querySelector('#myGuessText');
const aiGuessText = document.querySelector('#aiGuessText');
const playedNumbers = document.querySelector('#playedNumbers');

//Number boxes
const numbers1 = document.getElementsByClassName('numbers1');
const numbers2 = document.getElementsByClassName('numbers2');

const result = document.querySelector('#result');
const result2 = document.querySelector('#result2');

var aiNum = [];
var myGuess = [1, 1, 1, 1];
let aiGuess = [0, 0, 0, 0];

var aiHelpGuess = ['', '', '', ''];
var myNumber = [1, 1, 1, 1];

var bulls = 0;
var cows = 0;
var bulls2 = 0;
var cows2 = 0;

startBtn.addEventListener('click', (e) => {
  clearScreen();
  initialDiv.style.display = 'block';
});

//Duplicate numbers check
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

submitBtn1.addEventListener('click', (e) => {
  //Duplicate numbers check
  if (!hasDuplicates(myNumber)) {
    clearScreen();
    gameDiv.style.display = 'block';
    myNumberText.textContent = myNumber;
  }
});

submitBtn2.addEventListener('click', (e) => {
  //Duplicate numbers check
  if (!hasDuplicates(myGuess) && bulls2 !== 4) {
    res();

    result2.textContent = `Ai bulls: ${bulls2} cows: ${cows2}`;
    gameDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    submitBtn3.style.display = 'none';
    playedNumbers.style.display = 'none';
    myNumberText.textContent = myNumber;
    aiGuessText.textContent = '';
    getAiGuess();
    compare(aiNum, myGuess);
    setTimeout(() => {
      compareAi(myNumber, aiGuess);
      aiGuessText.textContent = aiGuess;
      submitBtn3.style.display = 'block';
    }, 3000);

    myGuessText.textContent = myGuess;
    console.log(`aiHelpGuess ${aiHelpGuess}`);
  }
});

submitBtn3.addEventListener('click', (e) => {
  gameDiv.style.display = 'block';
  resultsDiv.style.display = 'none';
  addNumber(myGuess);
  playedNumbers.style.display = 'block';
});

const compare = (arr1, arr2) => {
  for (i = 0; i < arr2.length; i++) {
    if (arr2[i] === arr1[i]) {
      bulls += 1;
    } else if (arr1.indexOf(arr2[i]) !== -1) {
      cows += 1;
    }
  }

  if (bulls === 4) {
    win('You', myGuess);
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
    }
  }

  if (bulls2 === 4) {
    win('Ai', aiGuess);
  }

  result2.textContent = `Ai bulls: ${bulls2} cows: ${cows2}`;
};

const getAiGuess = () => {
  for (let i = 0; i < aiHelpGuess.length; i++) {
    if (aiHelpGuess[i] !== '') {
      aiGuess[i] = aiHelpGuess[i];
    }
  }

  let i = 0;
  let a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  while (i < aiGuess.length) {
    if (aiGuess.indexOf(a) === -1) {
      if (aiGuess[i] !== aiHelpGuess[i]) {
        aiGuess[i] = a;
        a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      }
      i++;
    } else {
      a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    }
  }
};

getAiNumber = () => {
  //Only unique numbers
  let numArray = [];
  let ranNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  let i = 0;
  while (i < 4) {
    if (numArray.indexOf(ranNum) === -1) {
      numArray.push(ranNum);
      ranNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      i++;
    } else {
      ranNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    }
  }

  return numArray;
};

aiNum = getAiNumber();
console.log(aiNum);

const res = () => {
  bulls = 0;
  cows = 0;
  bulls2 = 0;
  cows2 = 0;
};

const clickControl = (act, n, faze) => {
  if (faze === 'choose') {
    if (act === 'inc' && myNumber[n] < 9) {
      myNumber[n] += 1;
      Array.from(numbers1)[n].textContent = myNumber[n];
    } else if (act === 'dec' && myNumber[n] > 1) {
      myNumber[n] -= 1;
      Array.from(numbers1)[n].textContent = myNumber[n];
    }
  } else if (faze === 'guess') {
    if (act === 'inc' && myGuess[n] < 9) {
      myGuess[n] += 1;
      Array.from(numbers2)[n].textContent = myGuess[n];
    } else if (act === 'dec' && myGuess[n] > 1) {
      myGuess[n] -= 1;
      Array.from(numbers2)[n].textContent = myGuess[n];
    }
  }
};

//Add played number to the list
const addNumber = (n) => {
  let usedNum = document.createElement('li');
  usedNum.textContent = `${n} b ${bulls} c ${cows}`;
  playedNumbers.appendChild(usedNum);
};

const win = (winner, score) => {
  clearScreen();
  winScreen.style.display = 'block';
  winScreen.textContent = `${winner} win ${score}`;
};

const clearScreen = () => {
  let containers = document.getElementsByClassName('containers');
  Array.from(containers).forEach((element) => {
    element.style.display = 'none';
  });
};
