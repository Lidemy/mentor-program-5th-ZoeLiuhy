import { useState, useRef, useCallback, useEffect } from "react";
import findWinner from "./utils";

const SIZE = 19;

export default function useBoard() {
  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)));
  const [winner, setWinner] = useState();

  const isBlackMoving = useRef(true);

  const lastRow = useRef();
  const lastCol = useRef();

  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        if (currentY !== y) return row;
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const handleChessClick = useCallback(
    (row, col, value) => {
      if (value) return;

      lastRow.current = row;
      lastCol.current = col;
      updateBoard(row, col, isBlackMoving.current ? "black" : "white");
      isBlackMoving.current = !isBlackMoving.current;
    },
    [updateBoard]
  );

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    setWinner(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  return {
    board,
    winner,

    handleChessClick,
  };
}
