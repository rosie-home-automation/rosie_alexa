'use strict'

let RosieAlexa = require('./lib/rosie_alexa')
let routes = require('./lib/routes')

let register = function(server, options, next) {
  let app = new RosieAlexa(server, options)

  routes(server, app)

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
