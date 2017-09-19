var wrapper = require('@pact-foundation/pact-node');

var runPactMockServer = function (pacts, logger) {
	var log = logger.create('pact');
	pacts = pacts || [];

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	pacts.forEach(function (pact) {
		var server = wrapper.createServer(pact);
		server.start().then(function () {
			log.info('Provider Mock Server running port: ' + server._options.port);
		});
	});
};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
