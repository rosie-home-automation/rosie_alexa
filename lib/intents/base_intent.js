'use strict'

class BaseIntent {
  static controllerName() {
    throw 'Not implemented.'
  }
  constructor(config) {
    this.config = config
  }
  handle(request) {
    throw 'Not implemented.'
  }
  baseUrl() {
    return this.config.ROSIE_CONTROLLER_URL + '/' + this.constructor.controllerName()
  }
}

module.exports = BaseIntent
