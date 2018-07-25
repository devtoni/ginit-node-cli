#! /usr/bin/env node

const chalk = require('chalk')
const meow = require('meow')
const figlet = require('figlet')

const container = require('../lib/container')
const create = container.resolve('create')

container
  .resolve('log')
  .print(figlet.textSync('ginit-node', { horizontalLayout: 'full' }), 'yellow')

const cli = meow({
  description: false,
  help: `
    Usage

      ${chalk.yellow('ginit-node-cli [command]')}

    Commands

      ${chalk.yellow('create')} Initialize current directory as git repository

    Options

      ${chalk.yellow('--version, -v')}        Print version
      ${chalk.yellow('--help, -h')}           Print help
    
    Examples
      ginit-node-cli create ${chalk.dim(
        '# Initialize current directory as git repository'
      )}
  `,
  flags: {
    version: {
      type: 'boolean',
      alias: 'v'
    },
    help: {
      type: 'boolean',
      alias: 'h'
    }
  }
})

run(cli.input, cli.flags)

function run([input], flags) {
  switch (input) {
    case 'create':
      create()
  }
}
