const collapse = (str:string) => {
  return str.split("\n").map(n => n.trim()).filter(n => !!n).join("")
}
// These are in FEN Notation
export const startingBoard = collapse(`
rnbqkbnr/
pppppppp/
8/
8/
8/
8/
PPPPPPPP/
RNBQKBNR w KQkq - 0 1
`);

export const limitedWhite = collapse(`
  rnbqkbnr/
  pppppppp/
  8/
  8/
  8/
  8/
  2PPPP2/
  2BQKB2 w KQkq - 0 1
`)

export const squireStart = collapse(`
  rnbqkbnr/
  pppppppp/
  8/
  8/
  8/
  8/
  4P3/
  4K3 w KQkq - 0 1
`)
