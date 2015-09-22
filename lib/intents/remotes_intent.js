'use strict'

let _ = require('underscore')
let BaseIntent = require('./base_intent')

const INTENT_NAME = 'Remotes'
const ROSIE_CONTROLLER_NAME = 'remotes'

class RemotesIntent extends BaseIntent {
  static intentName () {
    return INTENT_NAME
  }
  handle (request) {
    let remoteName = _.result(request.slots.remote, 'value')
    let qs = {
      command: this.command(_.result(results.slots.command, 'value'))
    }
    let url = this.baseUrl() + '/' + remoteName
    return {
      url: url,
      method: 'GET',
      qs: qs
    }
  }
  command (command) {
    if (RegExp('^(on|off)$').test(command)) {
      return `power ${command}`
    }
    return command
  }
}

module.exporst = LightingIntent
