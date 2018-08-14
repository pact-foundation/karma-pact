var wrapper = require('@pact-foundation/pact-node');
var deasync = require('deasync');

//check to see if each server has started, then it is pushed into an array

var runPactMockServer = function (pacts, logger) {
	var log = logger.create('pact');
	pacts = pacts || [];
	var count = 0;

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	function initializeServer(pact) {
		var server = wrapper.createServer(pact);
		server.start()
			.then(function () {
				log.info('Pact Mock Server running on port: ' + server.options.port);
				count+=1;
			})
			.catch(function(err) {
				log.error('Error while trying to run karma-pact: ' + err);
				throw err;
			});
	}

	pacts.map(initializeServer);

	deasync.loopWhile(function(){
		return count > 0
	});

};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
