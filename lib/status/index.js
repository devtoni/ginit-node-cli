class StatusMapper {
  map({ status }) {
    switch (status) {
      case 401:
        return `Couldn't log you in. Please provide correct credentials/token.`
      case 404:
        return 'Personal access token not found on Github'
      case 422:
        return 'There already exists a remote repository with the same name or personal token for this app on github is invalid, please remove it.'
      default:
        return `There has been an error with status ${status}.`
    }
  }
}

module.exports = StatusMapper
