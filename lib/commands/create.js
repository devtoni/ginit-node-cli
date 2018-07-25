module.exports = ({
  log,
  httpGithubRepository,
  statusMapper,
  gitRepository,
  utilities,
  authentication
}) => async () => {
  if (utilities.directoryExists('.git')) {
    log.print('Git directory exists!', 'red')
    process.exit()
  }

  try {
    const {token} = await authentication.getPersonalToken()
    const url = await httpGithubRepository.createRemoteRepository(token)
    if (url) {
      const isSetUpAlreadyDone = await gitRepository.execute(url)

      if (isSetUpAlreadyDone) {
        log.print('All done!', 'green')
        process.exit()
      }
    }
    process.exit(1)
  } catch (e) {
    const message = statusMapper.map({status: e.code})
    log.print(message, 'yellow')
    process.exit(1)
  }
}
