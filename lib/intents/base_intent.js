'use strict'

class BaseIntent {
  constructor (config) {
    this.config = config
  }
  handle (request) {
    throw 'Not implemented.'
  }
  baseUrl () {
    return this.config.ROSIE_CONTROLLER_URL + '/' + ROSIE_CONTROLLER_NAME
  }
}

module.exports = BaseIntent
