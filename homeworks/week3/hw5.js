const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const m = Number(lines[0])
  for (let i = 1; i <= m; i++) {
    const temp = lines[i].split(' ')
    const A = BigInt(temp[0])
    const B = BigInt(temp[1])
    const K = Number(temp[2])
    if (K === 1) {
      printBig(A, B)
    } else if (K === -1) {
      printSmall(A, B)
    }
  }
}

function printBig(A, B) {
  if (A > B) {
    console.log('A')
  } else if (A === B) {
    console.log('DRAW')
  } else {
    console.log('B')
  }
}

function printSmall(A, B) {
  if (A > B) {
    console.log('B')
  } else if (A === B) {
    console.log('DRAW')
  } else {
    console.log('A')
  }
}
