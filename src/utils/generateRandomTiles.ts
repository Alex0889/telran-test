import { generateArr } from './generateArr';

export const generateRandomTiles = (
  numRows: number,
  numCols: number,
): number[][] => {
  return generateArr(numRows, numCols, () => (Math.random() >= 0.5 ? 1 : 0));
};