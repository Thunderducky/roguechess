'use client'
import ChessBoardEditor from "./editor";
import {Chessboard} from 'react-chessboard'
export default function Editor() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      </div>
      <div style={{width:500, height:500}}>
        <ChessBoardEditor />
      </div>
    </main>
  )
}