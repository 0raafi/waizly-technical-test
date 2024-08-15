const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const minMaxSumCalculator = (arr) => {
  let min = arr[0];
  let max = arr[0];
  let totalSum = 0;

  for (let i = 0; i < arr.length; i++) {
    totalSum += arr[i];
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  const minSum = totalSum - max;
  const maxSum = totalSum - min;

  console.log('Output : ', minSum, maxSum);
}

rl.question('👨🏻‍💻 Please enter five space-separated integers (e.g., 1 2 3 4 5): ', (input) => {
  const arr = input.split(' ').map(Number);

  if (arr.length !== 5) {
    console.log('❌ Please enter exactly five integers.');
  } else {
    console.log('Input : ', input);
    minMaxSumCalculator(arr);
  }

  rl.close();
});

