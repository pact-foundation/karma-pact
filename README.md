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
    // the Pact options will go here
    pact: {
    	port: 1234,
    	consumer: "some-consumer",
    	provider: "some-provider"
    }
  });
};
```

The `pact` option can be configured using a single object to spin up a single service, or can be passed an array of objects which will spin up multiple pact services.  Please be sure not to have 
the same port number between options as they will conflict with each other.  All options are optional and are passed directly into [Pact Node](https://github
.com/pact-foundation/pact-node#create-pact-mock-server), which has the full list of available options, but it would be recommended to specify the port number at the least to prevent confusion.

## Examples

Check the `karma` folder under [Pact JS](https://github.com/pact-foundation/pact-js) for examples with Mocha and Jasmine.

## Running multiple Pact Mock Servers

In some situations it may be useful to run multiple Pact Mock Servers. For instance, when running tests with karma, if a consumer 
defines contracts for several providers, the generated Pact contracts may be mixed up. A solution to solve this is to
run one Pact Mock Server per provider.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

If you would like to implement `Pact` in another language, please check out the [Pact specification](https://github.com/bethesque/pact-specification) and have a chat to one of us on the [pact-dev Google group](https://groups.google.com/forum/#!forum/pact-support).

The vision is to have a compatible `Pact` implementation in all the commonly used languages, your help would be greatly appreciated!

## Questions?

Please search for potential answers or post question on our [official Pact StackOverflow](https://stackoverflow.com/questions/tagged/pact).
