const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const plusMinus = (arr) => {
  let zero = 0;
  let neg = 0;
  let pos = 0;

  arr.forEach((v) => {
    if (v === 0) {
      zero++;
    } else if (v < 0) {
      neg++;
    } else {
      pos++;
    }
  });

  const count = arr.length;
  const posratio = pos / count;
  const negratio = neg / count;
  const zeroratio = zero / count;

  console.log('Output : ');
  console.log(posratio.toFixed(6));
  console.log(negratio.toFixed(6));
  console.log(zeroratio.toFixed(6));
};

rl.question('👨🏻‍💻 Please enter the size of the array (n): ', (sizeInput) => {
  const n = parseInt(sizeInput, 10);

  rl.question('👨🏻‍💻 Please enter space-separated integers: ', (input) => {
    const arr = input.split(' ').map(Number);

    if (arr.length !== n) {
      console.log('❌ The number of integers does not match the size of the array.');
    } else {
      console.log('The size of the array : ', sizeInput);
      console.log('Input : ', input);
      plusMinus(arr);
    }

    rl.close();
  });
});
