var path = require('path')
var wrapper = require('@pact-foundation/pact-node')

var runPactMockServer = function (opts, logger) {
  var log = logger.create('pact')

  if (!opts) {
    opts = {}
  }

  opts.port = opts.port || 1234
  opts.log = opts.log || path.resolve(process.cwd(), 'logs', 'mockserver-integration.log')
  opts.dir = opts.dir || path.resolve(process.cwd(), 'pacts')
  opts.spec = opts.spec || 2
  opts.logLevel = opts.logLevel

  if (opts.logLevel) {
    wrapper.logLevel(opts.logLevel)
  }

  var server = wrapper.createServer(opts)
  server.start()
  server.on('start', function () {
    log.info('Provider Mock Server running on port: ' + opts.port)
  })

  process.on('SIGINT', function () {
    log.info('Removing all Provider Mock Servers instantiated.')
    wrapper.removeAllServers()
  })
}

runPactMockServer.$inject = ['config.pact', 'logger']

module.exports = {
  'framework:pact': ['factory', runPactMockServer]
}
