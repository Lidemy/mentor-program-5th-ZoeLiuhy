import styled from "styled-components";
import { useCallback } from "react";

const Col = styled.div`
  width: 30px;
  height: 30px;
  background: #c19d38;
  position: relative;

  &:before {
    content: "";
    height: 100%;
    width: 2px;
    background: black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ${(props) =>
      props.row === 0 &&
      `
    top: 50%;
    `}

    ${(props) =>
      props.row === 18 &&
      `
    height: 50%;
    `}
  }

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    background: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    ${(props) =>
      props.col === 0 &&
      `
      left: 50%;
    `}

    ${(props) =>
      props.col === 18 &&
      `
      width: 50%;
    `}
  }
`;

const ChessElement = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  transform: scale(0.85);
  top: 0;
  left: 0;
  z-index: 1;

  ${(props) =>
    props.value === "black" &&
    `
  background: black;
  `}

  ${(props) =>
    props.value === "white" &&
    `
  background: white;
  `}
`;
const Chess = ({ row, col, value, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(row, col, value);
  }, [row, col, value, onClick]);

  return (
    <Col row={row} col={col} onClick={handleClick}>
      <ChessElement value={value} />
    </Col>
  );
};

export default Chess;
