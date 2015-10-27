'use strict'

let _ = require('underscore')
let BaseIntent = require('./base_intent')

const INTENT_NAME = 'Remotes'
const ROSIE_CONTROLLER_NAME = 'remotes'

class RemotesIntent extends BaseIntent {
  static intentName() {
    return INTENT_NAME
  }
  static controllerName() {
    return ROSIE_CONTROLLER_NAME
  }
  handle(request) {
    let remoteName = _.result(request.slots.remote, 'value')
    let body = {
      command: this.command(_.result(request.slots.command, 'value'))
    }
    let url = this.baseUrl() + '/' + remoteName.toLowerCase()
    return {
      url: url,
      method: 'PUT',
      json: true,
      body: body
    }
  }
  command(command) {
    if (RegExp('^(on|off)$').test(command)) {
      return `power ${command}`
    }
    return command
  }
}

module.exports = RemotesIntent
