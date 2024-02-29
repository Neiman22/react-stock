export const percentDifference = (a, b) => {
  return (100 * ((b - a) / (a + b))).toFixed(2);
}