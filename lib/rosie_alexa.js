var Promise = require('bluebird')
var Request = Promise.promisify(require('request'))
var _ = require('underscore')

var RosieAlexa = function(server, options) {
  this.config = options
}

RosieAlexa.prototype.handleRequest = function(request) {
  var payload = request.payload
  if (payload.request.type == 'IntentRequest') {
    var intent = payload.request.intent
    var controller = intent.name.toLowerCase()
    var device = intent.slots.device.value
    var attributes = _.compact(_.map(_.omit(intent.slots, ['device']), function(value, key) {
      if (!value.value) return null

      var obj = {}
      obj[key] = value.value
      return obj
    }))
    attributes.unshift({})
    var payload = _.extend.apply(null, attributes)
    var url = this.baseUrl() + '/' + controller + '/' + device
    Request({
      url: url,
      method: 'PUT',
      body: payload,
      json: true
    }).spread(function(response, body) {
      return body
    })
  }
}

RosieAlexa.prototype.baseUrl = function() {
  return this.config.ROSIE_CONTROLLER_URL
}

module.exports = RosieAlexa
