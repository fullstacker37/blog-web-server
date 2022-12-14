const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../../logs/access.log')
// 创建 readStream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let totalNum = 0

// 逐行读取
rl.on('line', lineData => {
  if (!lineData) {
    return
  }
  // 记录总行数
  totalNum++
  const arr = lineData.split(' -- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
})

// 监听读取完成
rl.on('close', () => {
  console.log('Chrome 占比: ', chromeNum / totalNum)
})