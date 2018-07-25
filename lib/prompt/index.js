const inquirer = require('inquirer')

module.exports = () => ({
  ask: questions => inquirer.prompt(questions)
})
