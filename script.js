var aiNum = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
var playerNum = [];
var myGuess = [];
var bulls = 0;
var cows = 0;
const numbersForm = document.querySelector('#numbersForm');
const submitBtn = document.querySelector('#submitBtn');

var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var n3 = document.querySelector('#n3');
var n4 = document.querySelector('#n4');

var myGuessText = document.querySelector('#myGuessText');
var aiNumberText = document.querySelector('#aiNumberText');

const result = document.querySelector('#result');

aiNumberText.textContent = aiNum;
console.log(`ai: ${aiNum}`);

submitBtn.addEventListener('click', e => {
  myGuess = [Number(n1.value), Number(n2.value), Number(n3.value), Number(n4.value)];
  myGuessText.textContent = myGuess;
  compare(aiNum, myGuess);
  numbersForm.reset();
  console.log(`myGuess ${myGuess}`);
  console.log(`aiNum ${aiNum}`);
});

const compare = (arr1, arr2) => {
  for (i = 0; i < arr2.length; i++) {
    console.log(arr1[i], arr2[i]);
    if (arr2[i] === arr1[i]) {
      bulls += 1;
    } else if (arr1.indexOf(arr2[i]) !== -1) {
      cows += 1;
    }
  }

  result.textContent = `bulls: ${bulls} cows: ${cows}`;
};
