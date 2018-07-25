const {expect} = require('chai')
const nock = require('nock')
const sinon = require('sinon')

const container = require('../lib/container')
const github = container.resolve('httpGithubRepository')
const prompt = container.resolve('prompt')

describe('Test githubRepository', () => {
  describe('when request of creation for a new remote repository...', () => {
    const repositoryDetails = {
      name: 'test',
      description: 'default',
      private: false
    }

    const responseUrl = {
      clone_url: 'https://github.com/devtoni/test.git'
    }

    const token = 'valid-token'

    beforeEach(() => {
      sinon.stub(prompt, 'ask').resolves(repositoryDetails)
      nock('https://api.github.com')
        .post(`/user/repos?access_token=valid-token`, repositoryDetails)
        .reply(200, responseUrl)
        
    })
    afterEach(() => {
      prompt.ask.restore()
    })

    it('should handle the creation of a remote url repository', done => {
      github
        .createRemoteRepository(token)
        .then(url => {
          expect(url).to.eql('https://github.com/devtoni/test.git')
          done()
        })
        .catch(done)
    })
  })
})
