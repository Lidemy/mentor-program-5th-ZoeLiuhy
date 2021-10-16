import styled from "styled-components";
import Chess from "./Chess";
import useBoard from "./useBoard";

const Title = styled.h1`
  text-align: center;
`;
const Wrapper = styled.div`
  text-align: center;
`;
const Board = styled.div`
  display: inline-block;
  margin-top: 0;
`;

const Row = styled.div`
  display: flex;
`;

const WinnerAlert = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const WinnerInner = styled.div`
  background: #eeeeee;
  color: black;
  height: 300px;
  width: 300px;
  padding: 28px;
  text-align: center;
`;

function App() {
  const { board, winner, handleChessClick } = useBoard();
  return (
    <>
      <Title>五子棋</Title>
      {winner && (
        <WinnerAlert>
          <WinnerInner>
            {winner === "draw" && "平手"}
            {winner === "black" && "黑棋獲勝"}
            {winner === "white" && "白棋獲勝"}
            <br />
            <button onClick={() => window.location.reload()}>
              再玩一次吧 !
            </button>
          </WinnerInner>
        </WinnerAlert>
      )}
      <Wrapper>
        <Board>
          {board.map((row, rowIndex) => {
            return (
              <Row key={rowIndex}>
                {row.map((col, colIndex) => {
                  return (
                    <Chess
                      key={colIndex}
                      row={rowIndex}
                      col={colIndex}
                      value={board[rowIndex][colIndex]}
                      onClick={handleChessClick}
                    />
                  );
                })}
              </Row>
            );
          })}
        </Board>
      </Wrapper>
    </>
  );
}

export default App;
