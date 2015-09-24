'use strict'

let _ = require('underscore')
let BaseIntent = require('./base_intent')

const INTENT_NAME = 'Lighting'
const ROSIE_CONTROLLER_NAME = 'lighting'

class LightingIntent extends BaseIntent {
  static intentName() {
    return INTENT_NAME
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
  deviceAttribtues(slots) {
    let attributes = _.omit(slots, ['device'])
    attributes = _.map(attributes, (value, key) => {
      if (!value.value) return null
      return {[key]: value.value}
    })
    attributes = _.compact(attributes).unshift({})
    // return _.extend({}, ...attributes)
    return _.extend.apply(null, attributes)
  }
}

module.exporst = LightingIntent
