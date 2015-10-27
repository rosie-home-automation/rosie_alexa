'use strict'

let _ = require('underscore')
let BaseIntent = require('./base_intent')

const INTENT_NAME = 'Tasks'
const ROSIE_CONTROLLER_NAME = 'tasks'

class TasksIntent extends BaseIntent {
  static intentName () {
    return INTENT_NAME
  }
  static controllerName() {
    return ROSIE_CONTROLLER_NAME
  }
  handle (request) {
    let taskName = _.result(request.slots.task, 'value')
    let url = this.baseUrl() + '/' + taskName
    return {
      url: url,
      method: 'POST',
      json: true
    }
  }
}

module.exports = TasksIntent
