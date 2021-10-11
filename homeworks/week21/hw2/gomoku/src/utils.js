function countTotal(board, currentY, currentX, directionX, directionY) {
  const now = board[currentY][currentX];
  let tempX = currentX;
  let tempY = currentY;
  let total = 0;
  do {
    tempX += directionX;
    tempY += directionY;

    if (board[tempY] && board[tempY][tempX] === now) {
      total++;
    } else {
      break;
    }
  } while (true);
  return total;
}

export default function findWinner(board, y, x) {
  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    return board[y][x];
  }

  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }
}
