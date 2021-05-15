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
  const str = lines[0]
  if (reverse(str) === str) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function reverse(str) {
  let result = ''
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i]
  }
  return result
}
