var RosieAlexa = require('./lib/rosie_alexa')
var routes = require('./lib/routes')

var register = function(server, options, next) {
  var app = new RosieAlexa(server, options)

  routes(server, app)

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
