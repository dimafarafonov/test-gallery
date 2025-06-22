// Grayscale matrix: (R*0.2126 + G*0.7152 + B*0.0722) for each channel
const grayscaleMatrix = [
  0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0,
  0, 0, 0, 0, 1, 0,
];

const invertMatrix1 = [
  -1,
  0,
  0,
  0,
  1, // R' = -R + 1
  0,
  -1,
  0,
  0,
  1, // G' = -G + 1
  0,
  0,
  -1,
  0,
  1, // B' = -B + 1
  0,
  0,
  0,
  1,
  0, // A' = A
];

export { invertMatrix1, grayscaleMatrix };
