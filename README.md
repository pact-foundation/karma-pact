# Karma Pact

[![Build Status](https://travis-ci.org/pact-foundation/karma-pact.svg?branch=master)](https://travis-ci.org/pact-foundation/karma-pact)

Implementation of a Karma Plugin to launch a [Pact Mock Server](https://github.com/pact-foundation/pact-node) before executing your [Pact tests](https://github.com/pact-foundation/pact-js) on the browser.

From the [Pact website](http://docs.pact.io/):

>The Pact family of frameworks provide support for [Consumer Driven Contracts](http://martinfowler.com/articles/consumerDrivenContracts.html) testing.

>A Contract is a collection of agreements between a client (Consumer) and an API (Provider) that describes the interactions that can take place between them.

>Consumer Driven Contracts is a pattern that drives the development of the Provider from its Consumers point of view.

>Pact is a testing tool that guarantees those Contracts are satisfied.

Read [Getting started with Pact](http://dius.com.au/2016/02/03/microservices-pact/) for more information on
how to get going.

## Installation

First install the package from NPM:

```
npm install --save-dev karma-pact
```

Then, on your Karma Configuration file, add the below:

```javascript
module.exports = function (config) {
  config.set({
    // in here we are simply telling to use Jasmine with Pact
    frameworks: ['jasmine', 'pact'],
    // the Pact opts will go here
    pact: {}
  })
```

The `pact` configuration in the file is as follows (same present at [pact-node](https://github.com/pact-foundation/pact-node)):

```javascript
{
  port: <Number>,     // Port number that the server runs on, defaults to 1234
  ports: [<Number>],  // Array of port numbers to run multiple servers. {ports} and are {port} mutually exclusive 
  host: <String>,     // Host on which to bind the server on, defaults to 'localhost'
  log: <String>,      // File to log output on relative to current working directory, defaults to none
  ssl: <Boolean>,     // Create a self-signed SSL cert to run the server over HTTPS , defaults to 'false'
	sslcert: <String>,  // Path to a custom self-signed SSL cert file, 'ssl' option must be set to true to use this option. Defaults to none
	sslkey: <String>,   // Path a custom key and self-signed SSL cert key file, 'ssl' option must be set to true to use this option. Defaults to none
  cors: <Boolean>,    // Allow CORS OPTION requests to be accepted, defaults to 'false'
  dir: <String>,      // Directory to write the pact contracts relative to the current working directory, defaults to none
  spec: <Number>,     // The pact specification version to use when writing pact contracts, defaults to '1'
  consumer: <String>, // The name of the consumer to be written to the pact contracts, defaults to none
  provider: <String>  // The name of the provider to be written to the pact contracts, defaults to none
}
```

## Examples

Check the `karma` folder under [Pact JS](https://github.com/pact-foundation/pact-js) for examples with Mocha and Jasmine.

## Running multiple Pact Mock Servers

In some situations it may be useful to run multiple Pact Mock Servers. For instance, when running tests with karma, if a consumer 
defines contracts for several providers, the generated Pact contracts may be mixed up. A solution to solve this is to
run one Pact Mock Server per provider. For more info, see [pact-js issue #59](https://github.com/pact-foundation/pact-js/issues/59)

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

If you would like to implement `Pact` in another language, please check out the [Pact specification](https://github.com/bethesque/pact-specification) and have a chat to one of us on the [pact-dev Google group](https://groups.google.com/forum/#!forum/pact-support).

The vision is to have a compatible `Pact` implementation in all the commonly used languages, your help would be greatly appreciated!

## Contact

* Twitter: [@pact_up](https://twitter.com/pact_up)
* Google users group: https://groups.google.com/forum/#!forum/pact-support
