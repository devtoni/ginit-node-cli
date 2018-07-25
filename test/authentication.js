const {expect} = require('chai')
const nock = require('nock')
const sinon = require('sinon')

const container = require('../lib/container')
const authentication = container.resolve('authentication')
const storage = container.resolve('storage')
const prompt = container.resolve('prompt')
const config = container.resolve('config')
const btoa = require('btoa-lite')

describe('Test authentication', () => {
  const fakeCredentials = {username: 'devtoni', password: '12345678'}
  const hashedCredentials = btoa(
    `${fakeCredentials.username}:${fakeCredentials.password}`
  )
  const endPointOptions = {
    reqheaders: {
      accept: 'application/vnd.github.v3+json',
      'content-type': 'application/json; charset=utf-8',
      authorization: `Basic ${hashedCredentials}`
    },
    body: JSON.stringify(config.get('github').AUTHORIZATION_USER_CONFIG)
  }

  const response = {
      token: 'EltokenPayo'
  }
  beforeEach(() => {
    storage.set('test.credentials', '')
    config.set('github', {
      STORAGE_KEY: 'test.credentials',
      AUTHORIZATION_USER_CONFIG: {
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ginit-node-cli'
      }
    })
    sinon
      .stub(prompt, 'ask')
      .resolves({username: 'devtoni', password: '12345678'})
    nock('https://api.github.com', endPointOptions.reqheaders)
      .post(`/authorizations`, endPointOptions.body)
      .reply(200, response)
  })
  afterEach(() => {
    storage.delete('test.credentials')
    config.set('github', {
      STORAGE_KEY: 'github.credentials',
      AUTHORIZATION_USER_CONFIG: {
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ginit-node-cli'
      }
    })
    prompt.ask.restore()
  })

  it('should return the token from storage', done => {
    authentication
      .getPersonalToken()
      .then(({token}) => {
        expect(token).to.eq(response.token)
        done()
      })
      .catch(done)
  })
})
