const git = require('simple-git')()

module.exports = ({utilities, prompt, config}) => ({
  async createGitignore() {
    const directoryFiles = utilities.getDirectoryFiles(
      config.get('git').GIT_FILES
    )
    if (directoryFiles.length > 0) {
      const {filesToInclude = []} = await prompt.ask(
        config.get('questions').IGNORING_FILES(directoryFiles)
      )
      return utilities.writeFileSync('.gitignore', filesToInclude.join('\n'))
    } else {
      return utilities.touch('.gitignore')
    }
  },

  async setUpGitRepository(url) {
    try {
      await git
        .init()
        .add('.gitignore')
        .commit('Initial commit')
        .addRemote('origin', url)
        .push('origin', 'master')
      return true
    } catch (e) {
      return false
    }
  },

  async execute(url) {
    await this.createGitignore()
    return this.setUpGitRepository(url)
  }
})
