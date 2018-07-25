const btoa = require('btoa-lite')

module.exports = ({config, storage, prompt, fetcher}) => ({
  async getPersonalToken() {
    const authCredentials = storage.get(config.get('github').STORAGE_KEY)
    if (authCredentials && authCredentials.token) {
      return authCredentials
    } else {
      await this.setPersonalToken()
      return storage.get(config.get('github').STORAGE_KEY)
    }
  },

  async setPersonalToken() {
    const userCredentials = await this.getUserCredentials()
    const token = await this.generatePersonalToken(userCredentials)
    await this.savePersonalToken(token)
  },

  async getUserCredentials() {
    return prompt.ask(config.get('questions').GITHUB_AUTHENTICATION)
  },

  async generatePersonalToken({username, password}) {
    const hashedCredentials = btoa(`${username}:${password}`)
    const optionsPost = {
      headers: {
        authorization: `Basic ${hashedCredentials}`
      },
      body: JSON.stringify(config.get('github').AUTHORIZATION_USER_CONFIG)
    }

    return fetcher
      .post('https://api.github.com/authorizations', optionsPost)
      .then(({token}) => token)
  },

  async savePersonalToken(token) {
    storage.set(config.get('github').STORAGE_KEY, {token})
  }
})
