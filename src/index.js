var wrapper = require('@pact-foundation/pact-node');

const runPactMockServer = (pacts, logger) => {
	const log = logger.create('karma-pact');
	pacts = pacts || [];

	// If pact options is object, wrap in array
	if (!Array.isArray(pacts)) {
		pacts = [pacts];
	}

	return Promise.all(
		pacts.map(pact => {
			log.info("Starting Pact Mock Server...")
			const server = wrapper.createServer(pact);
			server.start()
				.then(
					() => {
						log.info('Pact Mock Server running on port: ' + server.options.port);
					},
					(err) => {
						log.error('Failed to start Pact Mock Server ' + err)
					}
				);
		})
	);
};

runPactMockServer.$inject = ['config.pact', 'logger'];

module.exports = {
	'framework:pact': ['factory', runPactMockServer]
};
