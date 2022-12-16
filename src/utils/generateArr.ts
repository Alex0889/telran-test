export const generateArr = (
  numRows: number,
  numCols: number,
  fn: () => number,
) => {
  const arr: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    arr.push(Array.from(Array(numCols), fn));
  }
  return arr;
};