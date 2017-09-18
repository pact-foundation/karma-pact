var path = require('path')
var wrapper = require('@pact-foundation/pact-node')

var runPactMockServer = function (opts, logger) {
  var log = logger.create('pact')

  if (!opts) {
    opts = []
  }

  // preserve backward compatibility with previous versions that did not specifiy an array of configs
  if (!Array.isArray(opts)) {
    opts = [opts]
  }

  opts.forEach(function (serverOpts) {
    serverOpts.port = serverOpts.port || 1234
    serverOpts.log = serverOpts.log || path.resolve(process.cwd(), 'logs', 'mockserver-integration.log')
    serverOpts.dir = serverOpts.dir || path.resolve(process.cwd(), 'pacts')
    serverOpts.spec = serverOpts.spec || 2
    serverOpts.logLevel = serverOpts.logLevel

    if (serverOpts.logLevel) {
      wrapper.logLevel(serverOpts.logLevel)
    }

    var server = wrapper.createServer(serverOpts)
    server.start()
    server.on('start', function () {
      log.info('Provider Mock Server running port: ' + serverOpts.port)
    })

    process.on('SIGINT', function () {
      log.info('Removing all Provider Mock Servers instantiated.')
      wrapper.removeAllServers()
    })
  })
}

runPactMockServer.$inject = ['config.pact', 'logger']

module.exports = {
  'framework:pact': ['factory', runPactMockServer]
}
