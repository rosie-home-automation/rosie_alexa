'use strict'

let _ = require('underscore')
let BaseIntent = require('./base_intent')

const INTENT_NAME = 'Lighting'
const ROSIE_CONTROLLER_NAME = 'lighting'

class LightingIntent extends BaseIntent {
  static intentName() {
    return INTENT_NAME
  }
  static controllerName() {
    return ROSIE_CONTROLLER_NAME
  }
  handle(request) {
    let deviceName = _.result(request.slots.device, 'value')
    let attributes = this.deviceAttributes(request.slots)
    let url = this.baseUrl() + '/' + deviceName
    return {
      url: url,
      method: 'PUT',
      body: attributes,
      json: true
    }
  }
  deviceAttributes(slots) {
    let attributes = _.omit(slots, ['device'])
    attributes = _.map(attributes, (value, key) => {
      if (!value.value) return null
      return {[key]: value.value}
    })
    attributes = _.compact(attributes)
    // return _.extend({}, ...attributes)
    attributes.unshift({})
    return _.extend.apply(null, attributes)
  }
}

module.exports = LightingIntent
