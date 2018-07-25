module.exports = ({ prompt, config, fetcher }) => ({
  async createRemoteRepository(token) {
    const repositoryDetails = await prompt.ask(
      config.get('questions').GITHUB_CREATE_REMOTE_REPOSITORY
    )

    const data = {
      ...repositoryDetails,
      private: repositoryDetails.private === 'private'
    }

    return fetcher
      .post(`https://api.github.com/user/repos?access_token=${token}`, {
        body: JSON.stringify(data)
      })
      .then(({ clone_url: url = '' }) => url)
  }
})
