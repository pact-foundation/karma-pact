var wrapper = require('@pact-foundation/pact-node');

var runPactMockServer = function (pacts, logger) {
	var log = logger.create('pact');
	pacts = pacts || [];

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	return Promise.all(pacts.map(function (pact) {
		var server = wrapper.createServer(pact);
		return server.start().then(function () {
			log.info('Pact Mock Server running on port: ' + server.options.port);
		}, function (err) {
			log.error('Error while trying to run karma-pact: ' + err);
		});
	}));
};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
