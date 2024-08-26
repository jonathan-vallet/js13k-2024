// Level data with specific tile color variations
const encodedLevels = [
  '-7Bz8N-9NEN5CN-6O-2Q-Q-4H-6E-3Q-Q-5P-5W-3NTN7MN-7U-2WN-6N3VN4VN3-3F-2N3GN4L-N2', // Editor level
  '-7Bz8N-9NEN5CN-6O-2Q-Q-4H-6E-3Q-Q-5P-5W-3NTN7MN-7V-2WN-6N3VN4UN3-3F-2N3GN4L-N2',
  '-6N-F-N-13N-3N-7N7Bz2CzMN7-2GAz-N2-6NLN-2N4-2N-6NHN-6E2-17A-2O',
  '-2N-3N5-9N-E-J-MCxBx2By-7N-3N5-By-7N-N-N5-N-5N3-E-P-2JE-N-5LJ2-E-N5-N-5N11HN-2F-2G-5Q5ON',
  '-6NGN-5EQN2-6N-N-5N-N2-4F-M-M-2O-2Cz-CzL-6N-N-2E-2N-NQ-6N5CN3-NQ-8N-7NQ-8N3JN5Q-8NL-4HQ2P',
];

const levels = [];

encodedLevels.forEach((encodedLevel) => {
  const level = decodeLevel(encodedLevel);
  levels.push(level);
});
