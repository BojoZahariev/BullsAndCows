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
const winText = document.querySelector('#winText');

const submitBtn1 = document.querySelector('#submitBtn1');
const submitBtn2 = document.querySelector('#submitBtn2');
const submitBtn3 = document.querySelector('#submitBtn3');
const submitBtn4 = document.querySelector('#submitBtn4');

const myNumberText = document.querySelector('#myNumberText');
const myNumberText2 = document.querySelector('#myNumberText2');
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

//player
var bulls = 0;
var cows = 0;
//AI
var bulls2 = 0;
var cows2 = 0;

startBtn.addEventListener('click', e => {
  clearScreen();
  initialDiv.style.display = 'block';

  bubbleText.textContent = "Choose your number, but don't tell me what it is.";
});

howToBtn.addEventListener('click', e => {
  clearScreen();
  instructions.style.display = 'block';

  bubbleText.textContent = "It's easy.";
});

playBtn.addEventListener('click', e => {
  clearScreen();
  initialDiv.style.display = 'block';

  bubbleText.textContent = "Choose your number, but don't tell me what it is.";
});

//Duplicate numbers check
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

//Number choice
submitBtn1.addEventListener('click', e => {
  //Duplicate numbers check
  if (!hasDuplicates(myNumber)) {
    clearScreen();
    gameDiv.style.display = 'block';

    bubbleText.textContent = 'Make a guess!';
    myNumberText.textContent = myNumber.join(' ');
  } else {
    TellOf();
    setTimeout(() => {
      bubbleText.textContent = 'Choose your number.';
    }, 3000);
  }
});

//Guess submit
submitBtn2.addEventListener('click', e => {
  //Duplicate numbers check
  if (!hasDuplicates(myGuess) && bulls2 !== 4) {
    res();

    clearScreen();
    bubbleText.textContent = 'Not bad.';
    resultsDiv.style.display = 'flex';
    submitBtn3.style.visibility = 'hidden';
    playedNumbers.style.display = 'none';
    myNumberText.textContent = myNumber.join(' ');
    myNumberText2.textContent = myNumber.join(' ');

    getAiGuess();
    compare(aiNum, myGuess);

    if (bulls < 4) {
      setTimeout(() => {
        compareAi(myNumber, aiGuess);

        bubbleText.textContent = `My guess is ${aiGuess.join(' ')}.`;
        submitBtn3.style.visibility = 'visible';
      }, 3000);

      myGuessText.textContent = myGuess.join(' ');
    }
  } else {
    TellOf();

    setTimeout(() => {
      bubbleText.textContent = 'Make a guess!';
    }, 3000);
  }
});

//result confirm btn
submitBtn3.addEventListener('click', e => {
  gameDiv.style.display = 'block';
  resultsDiv.style.display = 'none';

  bubbleText.textContent = 'Make a guess!';
  addNumber(myGuess);
  playedNumbers.style.display = 'block';
});

//Play again btn
submitBtn4.addEventListener('click', e => {
  res();
  clearScreen();
  playedNumbers.style.display = 'block';
  playedNumbers.innerHTML = '';
  playedNumbers.textContent = 'Played:';
  aiNum = getAiNumber();
  myNumber = [1, 1, 1, 1];
  myGuess = [1, 1, 1, 1];
  aiHelpGuess = ['', '', '', ''];

  Array.from(numbers1).forEach(element => {
    element.textContent = 1;
  });

  Array.from(numbers2).forEach(element => {
    element.textContent = 1;
  });

  submitBtn4.style.visibility = 'hidden';

  hero.style.display = 'block';
  bubbleText.textContent = 'Wanna play a game?';
});

//Compare player guess
const compare = (arr1, arr2) => {
  for (i = 0; i < arr2.length; i++) {
    if (arr2[i] === arr1[i]) {
      bulls += 1;
    } else if (arr1.indexOf(arr2[i]) !== -1) {
      cows += 1;
    }
  }

  //empty result first
  result.innerHTML = '';

  if (bulls === 4) {
    win('You');
  } else if (bulls > 0 || cows > 0) {
    bullsAndCows(result);
  }
};

//display Bulls and Cows
const bullsAndCows = parent => {
  for (let index = 0; index < bulls; index++) {
    let bull = document.createElement('img');
    bull.src = 'images/bull.png';
    bull.classList.add('bulls');
    parent.appendChild(bull);
  }

  for (let index = 0; index < cows; index++) {
    let cow = document.createElement('img');
    cow.src = 'images/cow.png';
    cow.classList.add('bulls');
    parent.appendChild(cow);
  }
};

//compare AI guess
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
    win('I');
  }
};

//generate AI guess
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

//generate AI number
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

//Generate the AI number
aiNum = getAiNumber();

const res = () => {
  bulls = 0;
  cows = 0;
  bulls2 = 0;
  cows2 = 0;
};

//Input numbers control
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
  usedNum.classList.add('playedNumber');
  usedNum.textContent = n.join(' ');
  bullsAndCows(usedNum);
  playedNumbers.appendChild(usedNum);
};

const win = winner => {
  clearScreen();
  winScreen.style.display = 'block';
  winText.textContent = '';

  if (winner === 'You') {
    bubbleText.textContent = 'Nooooo!';
    winText.textContent = 'You Win!';
    submitBtn4.style.visibility = 'visible';
  } else {
    setTimeout(() => {
      compareAi(myNumber, aiGuess);
      winText.textContent = 'The Cow Wins!';
      bubbleText.textContent = 'I Won! Suck my udder!';
      submitBtn4.style.visibility = 'visible';
    }, 4000);
  }
};

const clearScreen = () => {
  let containers = document.getElementsByClassName('containers');
  Array.from(containers).forEach(element => {
    element.style.display = 'none';
  });
};

//In case of not unique numbers
const TellOf = () => {
  bubbleText.textContent = 'Every digit has to be different!';

  angryCow.classList.toggle('animatedCow');
};
