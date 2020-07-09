const initialDiv = document.querySelector('#initialDiv');
const startBtn = document.querySelector('#startBtn');
const howToBtn = document.querySelector('#howToBtn');
const playBtn = document.querySelector('#playBtn');
const instructions = document.querySelector('#instructions');
const gameDiv = document.querySelector('#gameDiv');
const resultsDiv = document.querySelector('#resultsDiv');
const winScreen = document.querySelector('#winScreen');
const bubble = document.querySelector('#bubble');
const bubbleText = document.querySelector('#bubbleText');
const angryCow = document.querySelector('#angryCow');

const submitBtn1 = document.querySelector('#submitBtn1');
const submitBtn2 = document.querySelector('#submitBtn2');
const submitBtn3 = document.querySelector('#submitBtn3');

const myNumberText = document.querySelector('#myNumberText');
const myGuessText = document.querySelector('#myGuessText');

const playedNumbers = document.querySelector('#playedNumbers');

//Number boxes
const numbers1 = document.getElementsByClassName('numbers1');
const numbers2 = document.getElementsByClassName('numbers2');

const result = document.querySelector('#result');

var aiNum = [];
var myGuess = [1, 1, 1, 1];
let aiGuess = [0, 0, 0, 0];

var aiHelpGuess = ['', '', '', ''];
var myNumber = [1, 1, 1, 1];

var bulls = 0;
var cows = 0;
var bulls2 = 0;
var cows2 = 0;

startBtn.addEventListener('click', e => {
  clearScreen();
  initialDiv.style.display = 'block';

  bubbleText.textContent = "Choose your number, but don't tell me what it is";
});

howToBtn.addEventListener('click', e => {
  clearScreen();
  instructions.style.display = 'block';

  bubbleText.textContent = "It's easy.";
});

playBtn.addEventListener('click', e => {
  clearScreen();
  initialDiv.style.display = 'block';

  bubbleText.textContent = "Choose your number, but don't tell me what it is";
});

//Duplicate numbers check
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

submitBtn1.addEventListener('click', e => {
  //Duplicate numbers check
  if (!hasDuplicates(myNumber)) {
    clearScreen();
    gameDiv.style.display = 'block';

    bubbleText.textContent = 'Make a guess';
    myNumberText.textContent = myNumber;
  } else {
    TellOf();
    setTimeout(() => {
      bubbleText.textContent = 'Choose your number.';
    }, 3000);
  }
});

submitBtn2.addEventListener('click', e => {
  //Duplicate numbers check
  if (!hasDuplicates(myGuess) && bulls2 !== 4) {
    res();

    clearScreen();
    resultsDiv.style.display = 'block';
    submitBtn3.style.display = 'none';
    playedNumbers.style.display = 'none';
    myNumberText.textContent = myNumber;

    getAiGuess();
    compare(aiNum, myGuess);
    setTimeout(() => {
      compareAi(myNumber, aiGuess);

      bubbleText.textContent = `I say ${aiGuess}`;
      submitBtn3.style.display = 'block';
    }, 3000);

    myGuessText.textContent = myGuess;
  } else {
    TellOf();

    setTimeout(() => {
      bubbleText.textContent = 'Make a guess';
    }, 3000);
  }
});

submitBtn3.addEventListener('click', e => {
  gameDiv.style.display = 'block';
  resultsDiv.style.display = 'none';

  bubbleText.textContent = 'Make a guess';
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
    win('You');
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
    win('Ai');
  }
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
const addNumber = n => {
  let usedNum = document.createElement('li');
  usedNum.textContent = `${n} b ${bulls} c ${cows}`;
  playedNumbers.appendChild(usedNum);
};

const win = winner => {
  clearScreen();
  winScreen.style.display = 'block';
  winScreen.textContent = `${winner} win!`;
};

const clearScreen = () => {
  let containers = document.getElementsByClassName('containers');
  Array.from(containers).forEach(element => {
    element.style.display = 'none';
  });
};

const TellOf = () => {
  bubbleText.textContent = 'Every digit has to be different.';

  angryCow.classList.toggle('animatedCow');
};
