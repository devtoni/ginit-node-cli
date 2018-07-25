const fetch = require('node-fetch')

module.exports = ({ statusMapper, log }) => ({
  post(url = '', { headers = {}, ...rest }) {
    const headersContent = {
      accept: 'application/vnd.github.v3+json',
      'content-type': 'application/json; charset=utf-8',
      ...headers
    }

    return fetch(url, {
      method: 'POST',
      headers: headersContent,
      ...rest
    })
      .then(response => {
        if (!response.ok) {
          const message = statusMapper.map({ status: response.status })
          log.print(message, 'yellow')
        }
        return response
      })
      .then(response => response.json())
      .catch(e => e)
  }
})
