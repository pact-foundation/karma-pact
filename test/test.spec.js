describe('Karma Pact', function () {
	it('Should be runnable', function () {
		expect(true).toBeTruthy();
	});

	it('Pact mock service should be available', function (done) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			done();
		};
		xhr.onerror = function () {
			throw new Error("Could not connect to Pact service");
		};
		xhr.open('GET', 'http://127.0.0.1:1234', true);
		xhr.setRequestHeader('X-Pact-Mock-Service', 'true');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send();
	});
});
