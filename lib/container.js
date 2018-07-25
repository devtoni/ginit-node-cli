const {createContainer, asClass, asFunction, asValue} = require('awilix')

const Config = require('./config/Config')
const StatusMapper = require('./status')
const storage = require('./storage')
const create = require('./commands/create')
const httpGithubRepository = require('./github')
const gitRepository = require('./git')
const utilities = require('./utilities')
const log = require('./log')
const prompt = require('./prompt')
const authentication = require('./authentication')
const fetcher = require('./fetcher')

const container = createContainer()

container.register({
  config: asClass(Config).singleton(),
  statusMapper: asClass(StatusMapper).singleton(),
  create: asFunction(create).singleton(),
  httpGithubRepository: asFunction(httpGithubRepository).singleton(),
  gitRepository: asFunction(gitRepository).singleton(),
  storage: asFunction(storage).singleton(),
  log: asFunction(log).singleton(),
  prompt: asFunction(prompt).singleton(),
  authentication: asFunction(authentication).singleton(),
  fetcher: asFunction(fetcher).singleton(),
  utilities: asValue(utilities)
})

module.exports = container
