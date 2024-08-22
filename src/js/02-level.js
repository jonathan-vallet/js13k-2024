// Level data with specific tile color variations
const encodedLevels = [
  '-6N-F-N-13N-3N-7N7B/2C/MN7-2GA/-N2-6NLN-2N4-2N-6NHN-6E2-17A-2O',
  '-10N-16MC+B+B*-7E-7N-B*-9NPN5-N-5N3-6JE-N-5LJ2-E-4N2-N-5N11HN-2F-2G-5Q5ON',
];

const levels = [];

encodedLevels.forEach((encodedLevel) => {
  const level = decodeLevel(encodedLevel);
  levels.push(level);
});
