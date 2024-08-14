const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const proportionCalculator = (arr) => {
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;
  const total = arr.length;

  for (let i = 0; i < total; i++) {
    if (arr[i] > 0) {
      positiveCount++;
    } else if (arr[i] < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }

  const positiveRatio = (positiveCount / total).toFixed(6);
  const negativeRatio = (negativeCount / total).toFixed(6);
  const zeroRatio = (zeroCount / total).toFixed(6);

  console.log('Output : ');
  console.log(positiveRatio);
  console.log(negativeRatio);
  console.log(zeroRatio);
}

rl.question('👨🏻‍💻 Please enter the size of the array followed by the space-separated integers: ', (input) => {
  const inputs = input.split(' ');
  const n = parseInt(inputs[0]);
  const arr = inputs.slice(1).map(Number);

  if (arr.length !== n) {
    console.log(`❌ The array size doesn't match the number of elements entered.`);
  } else {
    console.log('Input : ', input);
    proportionCalculator(arr);
  }

  rl.close();
});

