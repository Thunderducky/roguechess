'use client';
import { useEffect, useMemo, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { limitedWhite, startingBoard } from "./starts";
import Engine from "@/engine";

export function isWindowSafe() {
  return typeof window !== "undefined";
}

const getFenFromQueryString = () => {
  if (!isWindowSafe()) {
    return "";
  }
  if (window && window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const fen = params.get("fen");
    if (fen) {
      return fen;
    }
  }
  return "";
};

export default function PlayVsComputer() {
  const levels = {
    "Easy 🤓": 2,
    "Medium 🧐": 8,
    "Hard 😵": 18,
  };
  const [engine, setEngine] = useState<Engine>();
  useEffect(() => {
    setEngine(new Engine());
  }, [])
  const game = useMemo(
    () => new Chess(getFenFromQueryString() || startingBoard),
    []
  );

  const [gamePosition, setGamePosition] = useState(game.fen());
  const [stockfishLevel, setStockfishLevel] = useState(2);

  function findBestMove() {
    if(!engine){ return; }
    engine.evaluatePosition(game.fen(), stockfishLevel);

    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        // In latest chess.js versions you can just write ```game.move(bestMove)```
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        });

        setGamePosition(game.fen());
      }
    });
  }

  function onDrop(sourceSquare: any, targetSquare: any, piece: any) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setGamePosition(game.fen());

    // illegal move
    if (move === null) return false;

    // exit if the game is over
    if (game.game_over() || game.in_draw()) return false;

    findBestMove();

    return true;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {Object.entries(levels).map(([level, depth]) => (
          <button
            key={level}
            style={{
              backgroundColor: depth === stockfishLevel ? "#B58863" : "#f0d9b5",
            }}
            onClick={() => setStockfishLevel(depth)}
          >
            {level}
          </button>
        ))}
      </div>
      <Chessboard position={gamePosition} onPieceDrop={onDrop} />
    </>
  );
}
