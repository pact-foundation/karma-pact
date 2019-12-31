var wrapper = require('@pact-foundation/pact-node');
var deasync = require('deasync');

var runPactMockServer = function (pacts, logger) {
	var log = logger.create('pact');
	pacts = pacts || [];

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	var startingServers = [];

	pacts.map(function (pact) {
		var server = wrapper.createServer(pact);
		server.start().then(function () {
			log.info('Pact Mock Server running on port: ' + server.options.port);
			// Remove current server from starting servers array
			startingServers = startingServers.filter(x => x !== server.options.port);
		}, function (err) {
			log.error('Error while trying to run karma-pact: ' + err);
		});
		// Add current server to starting servers array
		startingServers.push(server.options.port);
	});

	deasync.loopWhile(function () {
		return !isMockServerReady();
	});

	function isMockServerReady() {
		return startingServers.length === 0;
	}
};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
