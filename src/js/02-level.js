// Level data with specific tile color variations
const encodedLevels = [
  '', // Editor level
  '-6N-F-N-13N-3N-7N7Bz2CzMN7-2GAz-N2-6NLN-2N4-2N-6NHN-6E2-17A-2O',
  '-2N-3N5-9N-E-J-MCxBx2By-7N-3N5-By-7N-N-N5-N-5N3-E-P-2JE-N-5LJ2-E-N5-N-5N11HN-2F-2G-5Q5ON',
  'ByBz2-ByBz-2NGN-3EQN2BxByBBzByBBzCzM-M-3N-N2ByBzNBByN2Bz2N-O-2Cz-CzLByN2BBxBy-NBN-E-2N-NQBxByNBFByN2BN2CN3-NQByBzNBBz2-NBN2-5NQByN3-N2-BN2JN5QBx8BNL-3HQ2P',
  '-2NWzEMHx-3NLN2-5B-N4-O-2H-N-Bz3BxBFMVz-8N-3By-B-N2-8N-2Bz2-B-2N3Q4N4-2BBxBBz-N-9NBz3-4NM-2P-2Hx-2VzL-6NGxNG-2NLN3',
  '-7Bz8N-9NEN5CN-6O-2Q-Q-4H-6E-3Q-Q-5P-5W-3NTN7MN-7V-2WN-6N3VN4UN3-3F-2N3GN4L-N2',
  '-BxByBxGxNGy-4N-L-N-3CBxBVM-5N2HN2-2NMNQN9QN4GCQO-9PQHy-FN-NQN6WN2QN5-NVN-4N-4N5-3N-4N-2E-HxLN7-4N-4N4',
  'G-T6-DOH-2UxM-FN10-ND-N4-4N6-E-2N-7NWzVxHyEWx-E-2N-4D-2N2PNPN-N-2N-3N2-E-2EN3-N-2N-3LUz-7NHxN-TV-2GyWzT2JTJ-3NWNTGxT-N2',
  'LUzH-N4WWxWy-2TWzT-4NPQ-2Vx-E-4T-3N3-N4-5N5OEW-VQ-2P-E-2M3-FN3-N2-D3-3N5-UzHxPQ2-6VxT4G-2N4-3E-2VyT4GxL-N2LHy-2EUy2-VzT4Gy',
];

const levels = [];

encodedLevels.forEach((encodedLevel) => {
  const level = decodeLevel(encodedLevel);
  levels.push(level);
});
