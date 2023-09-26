import { useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { limitedWhite, startingBoard } from "../starts";

export function isWindowSafe() {
  return typeof window !== 'undefined';
}

const getFenFromQueryString = () => {
  if(!isWindowSafe()) {
    return '';
  }
  if(window && window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const fen = params.get('fen');
    if(fen) {
      return fen;
    }
  }
  return '';
}

export default function ChessBoardEditor() {
  const [game, setGame] = useState(new Chess(getFenFromQueryString() || startingBoard));

  return <>
    <Chessboard position={game.fen()} />
  </>;
}