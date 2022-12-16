import './Cell.css';

interface CellProps {
  handleClickOnCell: () => void;
  className: string;
}

const Cell = ({ handleClickOnCell, className }: CellProps) => {
  return (
    <div
      className={['cell', className].join(' ')}
      onClick={handleClickOnCell}
    />
  );
};

export default Cell;