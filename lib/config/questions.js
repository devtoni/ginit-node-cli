const argv = require('minimist')(process.argv.slice(2))
const {getCurrentWorkingDirectoryName} = require('../utilities')

exports.GITHUB_AUTHENTICATION = [
  {
    name: 'username',
    type: 'input',
    message: 'Enter your GitHub username or e-mail address:',
    validate: value =>
      value.length ? true : 'Please enter your username or e-mail address.'
  },
  {
    name: 'password',
    type: 'password',
    message: 'Enter your password:',
    validate: value => (value.length ? true : 'Please enter your password.')
  }
]

exports.GITHUB_CREATE_REMOTE_REPOSITORY = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter a name for the repository:',
    default: argv._[0] || getCurrentWorkingDirectoryName(),
    validate: value =>
      value.length ? true : 'Please enter a name for the repository.'
  },
  {
    type: 'input',
    name: 'description',
    default: argv._[1] || getCurrentWorkingDirectoryName(),
    message: 'Optionally enter a description of the repository:'
  },
  {
    type: 'list',
    name: 'private',
    message: 'Public or private:',
    choices: ['public', 'private'],
    default: 'public'
  }
]

exports.IGNORING_FILES = files => [
  {
    type: 'checkbox',
    name: 'filesToInclude',
    message: 'Select the files and/or folders you wish to ignore:',
    choices: files,
    default: ['node_modules']
  }
]
