const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const convertTo24hrFormat = (s) => {
  let period = s.slice(-2).toLowerCase();
  let hour = parseInt(s.slice(0, 2));
  let minutesSeconds = s.slice(2, -2);

  if (period === 'am') {
    if (hour === 12) {
      hour = 0;
    }
  } else if (period === 'pm') {
    if (hour !== 12) {
      hour += 12;
    }
  }

  let militaryHour = hour.toString().padStart(2, '0');

  let militaryTime = militaryHour + minutesSeconds;

  return militaryTime;
}

rl.question('Please enter the time in 12-hour format (e.g., 07:45:45PM): ', (time12hr) => {
  if (!/^\d{1,2}:\d{2}:\d{2}(AM|PM|am|pm)$/.test(time12hr)) {
    console.log('❌ Invalid time format. Please enter the time in 12-hour format (e.g., 07:45:45PM).');
  } else {
    console.log('Input : ', time12hr);
    const time24hr = convertTo24hrFormat(time12hr);
    console.log('Output : ', time24hr);
  }

  rl.close();
});

