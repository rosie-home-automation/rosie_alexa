var routes = function(server, app) {
  server.route({
    method: 'POST',
    path: '/',
    config: {
      handler: function(request, response) {
        app.handleRequest(request)
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
