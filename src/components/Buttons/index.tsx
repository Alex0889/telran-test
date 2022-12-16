import {memo} from "react";

interface ButtonProps {
  handleToggleStart: () => void,
  handleRandom: () => void,
  handleClear: () => void,
  running: boolean
}

const Buttons = ({handleToggleStart, handleRandom, handleClear, running}: ButtonProps) => {
  return (
    <div className='d-flex justify-content-center pt-5'>
      <button className='btn btn-success mx-2' onClick={handleToggleStart}>
        {running ? 'Stop' : 'Start'}
      </button>

      <button className='btn btn-success mx-2' onClick={handleRandom}>
        Random
      </button>

      <button className='btn btn-success mx-2' onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default memo(Buttons);