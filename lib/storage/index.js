const ConfigStore = require('configstore')
const pkg = require('../../package.json')
const config = new ConfigStore(pkg.name)

module.exports = () => ({
  get: key => !!config.get(key) && config.get(key),
  set: (key, value) => {
    try {
      config.set(key, value)
      return true
    } catch (e) {
      return false
    }
  },
  delete: key => {
    try {
      config.delete(key)
      return true
    } catch (e) {
      return false
    }
  }
})
