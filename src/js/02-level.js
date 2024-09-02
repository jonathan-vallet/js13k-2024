// Level data with specific tile color variations
const encodedLevels = [
  '', // Editor level
  '-6N-F-N-13N-3N-7N7Bz2CzMN7-2GAz-N2-6NLN-2N4-2N-6NHN-6E2-17A-2O',
  '-2N-3N5-9N-E-J-MCxBx2By-7N-3N5-By-7N-N-N5-N-5N3-E-P-2JE-N-5LJ2-E-N5-N-5N11HN-2F-2G-5Q5ON',
  '-6NGN-5EQN2-6N-N-5N-N2-4F-M-M-2O-2Cz-CzL-6N-N-2E-2N-NQ-6N5CN3-NQ-8N-7NQ-8N3JN5Q-8NL-4HQ2P',
  '-7Bz8N-9NEN5CN-6O-2Q-Q-4H-6E-3Q-Q-5P-5W-3NTN7MN-7V-2WN-6N3VN4UN3-3F-2N3GN4L-N2',
  '-BxByBxGxNGy-4N-L-N-3CBxBVM-5N2HN2-2NMNQN9QN4GCQO-9PQHy-FN-NQN6WN2QN5-NVN-4N-4N5-3N-4N-2E-HxLN7-4N-4N4',
  'G-T6-DOH-2UxM-FN10-ND-N4-4N6-E-2N-7NWzVxHyEWx-E-2N-4D-2N2PNPN-N-2N-3N2-E-2EN3-N-2N-3LUz-7NHxN-TV-2GyWzT2JTJ-3NWNTGxT-N2',
];

const levels = [];

encodedLevels.forEach((encodedLevel) => {
  const level = decodeLevel(encodedLevel);
  levels.push(level);
});
