const {expect} = require('chai')
const sinon = require('sinon')
const container = require('../lib/container')
const prompt = container.resolve('prompt')
const git = container.resolve('gitRepository')

describe('Test gitRepository', () => {
  describe('should create a .gitignore file with files to ignore included', () => {
    let createGitignore
    beforeEach(() => {
      sinon.stub(prompt, 'ask').resolves(['node_modules'])
      sinon.stub(git, 'setUpGitRepository').resolves(true)
      createGitignore = sinon.spy(git, 'createGitignore')
    })

    afterEach(() => {
      prompt.ask.restore()
      git.setUpGitRepository.restore()
      createGitignore.restore()
    })
    it('should be called', done => {
      git.execute({url: 'https://github.com/devtoni/test.git'})
        .then(response => {
          expect(createGitignore.called).to.true
          expect(response).to.true
          done()
        })
        .catch(done)
    })
  })
})
