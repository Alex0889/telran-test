import { generateArr } from './generateArr';

export const generateEmptyGrid = (
  numRows: number,
  numCols: number,
): number[][] => {
  return generateArr(numRows, numCols, () => 0);
};