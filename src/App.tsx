import { useCallback, useRef, useState } from 'react';
import Cell from './components/Cell';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import useInterval from './hooks/useInterval';
import { generateEmptyGrid } from './utils/generateEmptyGrid';
import { generateRandomTiles } from './utils/generateRandomTiles';
import Buttons from './components/Buttons';

const rows = 50;
const columns = 50;

const directions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const App = () => {
  const [grid, setGrid] = useState<number[][]>(
    generateRandomTiles(rows, columns),
  );
  const [running, setRunning] = useState<boolean>(false);

  const runningRef = useRef<boolean>();
  runningRef.current = running;

  const play = useCallback((grid: number[][]) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let neighbors = 0;

        directions.forEach(([x, y]) => {
          const x1 = i + x;
          const y1 = j + y;

          if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < columns && grid[x1][y1]) {
            neighbors += 1;
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setGrid(gridCopy);
  }, []);

  const handleRandom = useCallback(() => {
    setRunning(false);
    setGrid(generateRandomTiles(rows, columns));
  }, []);

  const handleClear = useCallback(() => {
    setRunning(false);
    setGrid(generateEmptyGrid(rows, columns));
  }, []);

  const handleToggleStart = useCallback(() => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
    }
  }, [runningRef.current]);

  const handleClickOnCell = (y: number, x: number) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[y][x] = grid[y][x] ? 0 : 1;
    setGrid(newGrid);
  };

  useInterval(() => {
    play(grid);
  }, 100);

  return (
    <div className='py-5'>
      <div className='d-grid m-auto grid'>
        {grid.map((rows, y) =>
          rows.map((col, x) => (
            <Cell
              key={`${y}-${x}`}
              className={grid[y][x] ? 'on' : 'off'}
              handleClickOnCell={() => handleClickOnCell(y, x)}
            />
          )),
        )}
      </div>

      <Buttons
        handleToggleStart={handleToggleStart}
        handleRandom={handleRandom}
        handleClear={handleClear}
        running={running}
      />
    </div>
  );
};

export default App;
