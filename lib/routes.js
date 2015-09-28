'use strict'

let routes = function(server, app) {
  server.route({
    method: 'POST',
    path: '/alexa',
    config: {
      handler: function(request, response) {
        let retVal = app.handleRequest(request)
console.warn("RET VAL", retVal) // TODO - Remove once you actually make use of the response
        response({
          version: "0.1.0",
          sessionAttributes: {},
          response: {
            outputSpeech: {
              type: "PlainText",
              text: "Done"
            }
          }
        })
      }
    }
  })
}

module.exports = routes
