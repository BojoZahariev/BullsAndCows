var aiNum = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
var playerNum = [];
var myNumber = [];
const numbersForm = document.querySelector('#numbersForm');
const submitBtn = document.querySelector('#submitBtn');
var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var n3 = document.querySelector('#n3');
var n4 = document.querySelector('#n4');

var myNumberText = document.querySelector('#myNumberText');
console.log(`ai: ${aiNum}`);

submitBtn.addEventListener('click', e => {
  myNumber = [Number(n1.value), Number(n2.value), Number(n3.value), Number(n4.value)];
  myNumberText.textContent = myNumber;
  compare(aiNum, myNumber);
  numbersForm.reset();
});

const compare = (arr1, arr2) => {
  for (i = 0; i < arr1.length; i++) {
    console.log(arr1[i], arr2[i]);
    if (arr1[i] === arr2[i]) {
      console.log('bull');
    } else {
      console.log('cow');
    }
  }
};
