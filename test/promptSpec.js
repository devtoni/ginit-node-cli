const {expect} = require('chai')
const container = require('../lib/container')
const prompt = container.resolve('prompt')
const inquirer = require('inquirer')
const sinon = require('sinon')

const question = {
  type: 'list',
  name: 'test',
  message: 'testing man',
  choices: ['1', '2', '3']
}

describe('Test Prompt', () => {
  describe('when asks a prompt', () => {
    beforeEach(() => {
      sinon.stub(inquirer, 'prompt').resolves({test: '1'})
    })
    afterEach(() => {
      inquirer.prompt.restore()
    })

    it('should return the promise containing the response', done => {
      prompt.ask(question).then(({test}) => {
        expect(question.choices).to.include(test)
        done()
      })
    })
  })
})
