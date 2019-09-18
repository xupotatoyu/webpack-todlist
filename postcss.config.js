// stylus文件编译成css之后，再通过postcss文件来优化代码
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer() // 自动处理需要加浏览器前缀的css属性(-moz、-ms、-webkit)，无需声名
  ]
}