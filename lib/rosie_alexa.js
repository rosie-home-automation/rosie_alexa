'use strict'

let Promise = require('bluebird')
let Request = Promise.promisify(require('request'))
let _ = require('underscore')
let VerifyAlexaSignature = require('verify_alexa_signature')
let LightingIntent = require('./intents/lighting_intent')
let RemotesIntent = require('./intents/remotes_intent')
let TasksIntent = require('./intents/tasks_intent')

class RosieAlexa {
  constructor(server, options) {
    this.config = options
    this.setupIntentHandlers()
  }
  handleRequest(request) {
    VerifyAlexaSignature.verify(request.headers.signature, request.headers.signaturecertchainurl, request.payload)
      .then((valid) => {
        console.warn("ALEXA SIG", valid)
        let request = request.payload.request
        if (request.type === 'IntentRequest') {
          let name = request.intent
          let intent = this.intents[name]
          if (intent) {
            let requestParams = intent.handle(request)
            Request(requestParams).spread((response, body) => {
              return body
            })
          }
          else {
            return null
          }
        }
      })
      .catch((err) => { console.warn("ALEXA INVALID SIG", err) })
  }
  setupIntentHandlers() {
    this.intents = {
      [LightingIntent.intentName()]: new LightingIntent(this.config),
      [RemotesIntent.intentName()]: new RemotesIntent(this.config),
      [TasksIntent.intentName()]: new TasksIntent(this.config)
    }
  }
}

module.exports = RosieAlexa
