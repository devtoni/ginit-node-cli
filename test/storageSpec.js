const { expect } = require('chai')

const container = require('../lib/container')
const storage = container.resolve('storage')

describe('Test Storage', () => {
  describe('when get is triggered..', () => {
    beforeEach(() => {
      storage.set('test', 'example')
    })
    afterEach(() => {
      storage.delete('key')
    })
    it('should return the value stored at this key', done => {
      expect(storage.get('test')).to.equal('example')
      done()
    })

    it('should return false when key does not exist', done => {
      expect(storage.get('dadasd')).to.false
      done()
    })
  })

  describe('when "set" key,value is triggered', () => {
    it('should save the value return the value stored at this key when is saved before', done => {
      expect(storage.set('other', 'example')).to.true
      storage.delete('other')
      done()
    })
  })

  describe('when delete "key" is triggered..', () => {
    beforeEach(() => {
      storage.set('other', 'example')
    })

    it('should delete the key-value', () => {
      expect(storage.delete('other')).to.true
    })
  })
})
