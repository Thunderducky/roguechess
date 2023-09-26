'use client';
import PlayRandomMoveEngine from './page2'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{width:500, height:500}}>
        <PlayRandomMoveEngine />
      </div>
    </main>
  )
}
