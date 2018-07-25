const configs = require('./index')

class Config {
  constructor() {
    this._config = {...configs}
  }

  get(key) {
    return !!this._config[key] && this._config[key]
  }

  set(key, value) {
    this._config[key] = value
    return this
  }

  delete(key) {
    return !!this._config[key] && delete this._config[key] && true
  }
}

module.exports = Config
