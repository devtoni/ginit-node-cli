const chalk = require('chalk')

module.exports = () => ({
  print: (message, color) => {
    console.log(chalk[color](message))
  }
})
