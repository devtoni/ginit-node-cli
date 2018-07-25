const { expect } = require('chai')
const container = require('../lib/container')
const statusMapper = container.resolve('statusMapper')

describe('StatusMapper', () => {
  it('should log 401 errors', done => {
    const message = statusMapper.map({ status: 401 })
    expect(message).to.eql(
      `Couldn't log you in. Please provide correct credentials/token.`
    )
    done()
  })

  it('should log 422 errors', done => {
    const message = statusMapper.map({ status: 422 })
    expect(message).to.equal(
      'There already exists a remote repository with the same name or personal token for this app on github is invalid, please remove it.'
    )
    done()
  })

  it('should log default errors', done => {
    const message = statusMapper.map({ status: 500 })
    expect(message).to.equal(`There has been an error with status 500.`)
    done()
  })
})
