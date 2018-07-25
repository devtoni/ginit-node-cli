const {
  closeSync,
  openSync,
  statSync,
  writeFileSync,
  readdirSync
} = require('fs')

const path = require('path')

exports.getCurrentWorkingDirectoryName = () => path.basename(process.cwd())

exports.directoryExists = directoryName => {
  try {
    return statSync(directoryName).isDirectory()
  } catch (e) {
    return false
  }
}

exports.touch = filename => {
  try {
    return closeSync(openSync(filename, 'w'))
  } catch (e) {
    return false
  }
}

exports.writeFileSync = (fileName, data) => {
  try {
    return writeFileSync(fileName, data)
  } catch (e) {
    return false
  }
}

exports.readdirSync = args => readdirSync(args)

exports.getDirectoryFiles = (filesToIgnore = []) =>
  readdirSync('.').filter(file => !filesToIgnore.includes(file))
