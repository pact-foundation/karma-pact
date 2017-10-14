describe('Karma Pact', function () {
	it('Should be runnable', function () {
		expect(true).toBeTruthy();
	});
	
	function call(port, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			success();
		};
		xhr.onerror = function () {
			error();
		};
		xhr.open('GET', 'http://127.0.0.1:' + port, true);
		xhr.setRequestHeader('X-Pact-Mock-Service', 'true');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send();
	}
	
	it('First Pact mock service should be available', function (done) {
		call('1234', function () {
			done();
		}, function () {
			throw new Error("Could not connect to Pact service");
		});
	});
	
	it('Second Pact mock service should be available', function (done) {
		call('1235', function () {
			done();
		}, function () {
			throw new Error("Could not connect to Pact service");
		});
	});
});
