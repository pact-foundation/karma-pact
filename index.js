var path = require('path')
var wrapper = require('@pact-foundation/pact-node')

var runPactMockServer = function (opts, logger) {
  var log = logger.create('pact')

  if (!opts) {
    opts = {}
  }

  if (opts.port && opts.ports) {
    log.info('The Pact Mock Server karma configuration can not specify both {port} and {ports} fields')
    process.exit(1)
  }

  if ((!opts.port && !opts.ports)) {
    opts.port = 1234
    log.info('No Pact Mock Server port configuration specified. Using port ' + opts.port)
  }

  opts.ports = opts.port ? [opts.port] : opts.ports
  opts.log = opts.log || path.resolve(process.cwd(), 'logs', 'mockserver-integration.log')
  opts.dir = opts.dir || path.resolve(process.cwd(), 'pacts')
  opts.spec = opts.spec || 2
  opts.logLevel = opts.logLevel

  if (opts.logLevel) {
    wrapper.logLevel(opts.logLevel)
  }

  opts.ports.forEach(function (port) {
    var serverOpts = JSON.parse(JSON.stringify(opts))
    serverOpts.port = port
    var server = wrapper.createServer(serverOpts)
    server.start()
    server.on('start', function (server) {
      log.info('Provider Mock Server running on port: ' + server._options.port)
    })
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
