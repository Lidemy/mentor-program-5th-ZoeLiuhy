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
  const temp = lines[0].split(' ')
  const firstNumber = Number(temp[0])
  const secondNumber = Number(temp[1])
  for (let i = firstNumber; i <= secondNumber; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

// 回傳數字幾位數(除10除幾次就是幾位數)
function countDigits(n) {
  if (n === 0) return 1
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}

// 對10取餘數
function isNarcissistic(n) {
  let k = n
  const digits = countDigits(k)
  let sum = 0
  while (k !== 0) {
    const remainder = k % 10
    sum += remainder ** digits
    k = Math.floor(k / 10)
  }
  return sum === n
}
