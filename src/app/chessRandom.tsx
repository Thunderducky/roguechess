import { useMemo, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { limitedWhite, startingBoard } from "./starts";

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

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess(getFenFromQueryString() || startingBoard));

  function makeAMove(move:any) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0){
      alert("Game over");
      return; // exit if the game is over
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare:any, targetSquare:any) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return <>
    <Chessboard position={game.fen()} onPieceDrop={onDrop} />
  </>;
}