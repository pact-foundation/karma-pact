
module.exports = function (config) {
	config.set({
		basePath: '',
		plugins: ['karma-*', require('../src/index')], // Load Pact framework plugin inline
		// in here we are simply telling to use Jasmine and Pact
		frameworks: ['jasmine', 'pact'],
		// the Pact options will go here
		pact: {
			port: 1234,
			consumer: 'some-consumer',
			provider: 'some-provider'
		},
		files: ['./*.spec.js'],
		port: 9876,
		colors: true,
		browsers: ['PhantomJS'],
		logLevel: 'DEBUG',
		singleRun: true,
		reporters: ['spec']
	});
};
