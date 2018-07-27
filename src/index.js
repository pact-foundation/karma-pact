var wrapper = require('@pact-foundation/pact-node');
var deasync = require('deasync');
var Promise = require('bluebird');

var runPactMockServer = function (pacts, logger) {
	var log = logger.create('pact');
	pacts = pacts || [];
	
	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}
	
	var done = false;
	
	var count = 0;

	Promise.all(pacts.map(function (pact) {

		var server = wrapper.createServer(pact);
		return server.start().then(function () {
			log.info('Pact Mock Server running on port: ' + server.options.port);
			if (++count === pacts.length) {
				done = true;
			}
		}, function (err) {
			if (++count === pacts.length) {
				done = true;
			}
			log.error('Error while trying to run karma-pact: ' + err);
			reject(err);
			throw err;
		});
	})).then(function() {
		done = true;
	});

	deasync.loopWhile(function(){
		return !done;
	});

};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
