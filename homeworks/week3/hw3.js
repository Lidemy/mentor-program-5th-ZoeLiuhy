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
  for (let i = 1; i <= lines.length - 1; i++) {
    const n = Number(lines[i])
    if (isPrime(n)) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

function isPrime(n) {
  if (n === 1) return false
  for (let k = 2; k < n; k++) {
    if (n % k === 0) {
      return false
    }
  }
  return true
}
