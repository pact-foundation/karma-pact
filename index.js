var path = require('path')
var wrapper = require('@pact-foundation/pact-node')

var runPactMockServer = function (opts) {
  opts = opts || { port: 1234 }
  opts.log = opts.log || path.resolve(process.cwd(), 'logs', 'mockserver-integration.log')
  opts.dir = opts.dir || path.resolve(process.cwd(), 'pacts')
  opts.spec = opts.spec || 2

  wrapper.createServer(opts).start().then(function () {
    console.log('Pact Mock server started on port: ' + opts.port)
  })

  process.on('SIGINT', function () {
    wrapper.removeAllServers()
  })
}

runPactMockServer.$inject = ['config.pact.opts']

module.exports = {
  'framework:pact': ['factory', runPactMockServer]
}
