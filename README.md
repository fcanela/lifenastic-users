# Lifenastic Users Microservice

[![npm version][npmsemver-image]][npmsemver-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][cv-image]][cv-url]
[![Code Climate][cq-image]][cq-url]
[![Dependencies][deps-image]][deps-url]
[![Dev Dependencies][dev-deps-image]][dev-deps-url]
[![License][license-image]][license-url]

> Users handler microservice for Lifenastic

## Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [NPM tasks](#npm-tasks)
* [Vagrant enviroment](#vagrant)
* [Contributing and help](#contributing)
    * [Criticism](#criticism)
    * [Developing](#developing)
    * [Bug reports, feature requests and discussion](#contributing)
* [License](#license)
* [Frequently Asked Questions](#faq)


## <a name="introduction"></a> Introduction
TODO

## <a name="features"></a> Features
TODO

## <a name="installation"></a> Installation
TODO: Update when docker container is ready

Clone the repository
```
    git clone https://github.com/fcanela/lifenastic-users.git users-service
    cd users-service
```
Install dependencies
```
    npm install
```
Configure following configuration section
```
    npm run db:migrate
```

## <a name="configuration"></a> Configuration

This service is configured via enviroment variables.

If `NODE_ENV` variable value is not `production` it loads `.env` file lines as enviroment variables.

A `.env.example` file can be found as documentation. It is also filled with the values that the service need to be runnable under the provided Vagrant virtual machines, just copy it as `.env`.

## <a name="npm-tasks"></a> Useful npm tasks

The module has some `npm` scripts which could be useful for developing purpose:

* `npm start` is not implemented yet
* `npm run db:migrate` installs the pending schemas to bring the database up to date
* `npm run db:rollback` undo the last migration
* `npm test` runs the linter and all the tests
* `npm run test:unit` runs the unit testing. Using `npm run test:unit:watch` will watch for changes
* `npm run test:unit` runs the integration testing. Using `npm run test:integration:watch` will watch for changes. Remember to set up the service dependencies and provide their connection settings as enviroment variables.
* `npm run lint` lints the code

## <a name="vagrant"></a> Vagrant enviroment

Two virtual machines defined...

* `db` which contains a running PostgreSQL server
* `sandbox` which contains NodeJS and a synced repository directory at `/repo`

If you're not familiar with Vagrant this commands can be useful for you:

* Initialize your machines with `vagrant up --provision` the first time you start it. Installing the dependencies could take a while. Be patient.
* `vagrant up` to bring up the virtual machines
* `vagrant ssh sandbox` to automatically log in into `sandbox` virtual machine. `cd /repo` to access the synced folder.
* `vagrant halt` to shut down your virtual machines and free their resources

Be careful in multiusers hosts: this virtual machines have been configured to use the default SSH keypairs and can be accesed by anyone on localhost.

The Ansible playbook used to configure those virtual machines could be found in `/ansible` directory.


## <a name="contributing"></a> Contributing and help

### <a name="criticism"></a> Criticism
If you think something could be done better or simply sucks, bring up a issue on the [tracker](https://github.com/fcanela/lifenastic-users/issues). Don't be shy. I really love feedback and technical discussions.

### <a name="developing"></a> Developing
~~Pull requests are welcome (and will make me cry in joy) as long as they pass tests for included and old features.~~ I can not accept pull requests until mid-2017. Please, contact me if needed. Sorry.

Did I already say that I **love** technical discussions? Feel free to open a issue on the [tracker](https://github.com/fcanela/lifenastic-users/issues) if you have any doubt.

### <a name="bugs"></a> Bug reports, feature requests and discussion

Use the [GitHub issue tracker](https://github.com/fcanela/lifenastic-users/issues) to report any bugs or file feature requests. In case you found a bug and have no GitHub account, feel free to email me: fcanela.dev at gmail dot com.

## <a name="license"></a> License

Copyright (c) 2016 Francisco Canela. Licensed under the MIT license.

## <a name="faq"></a> Frequently Asked Questions

### Is this production ready?

This service uses [semantic versioning](http://semver.org/) for versioning.

Do not expect a working or stable version until 1.0.0 version is reached.

[npmsemver-image]: https://img.shields.io/badge/version-0.0.0-orange.svg
[npmsemver-url]: https://github.com/fcanela/lifenastic-users
[ci-image]: https://travis-ci.org/fcanela/lifenastic-users.svg?branch=master
[ci-url]: https://travis-ci.org/fcanela/lifenastic-users
[cv-image]: https://coveralls.io/repos/github/fcanela/lifenastic-users/badge.svg?branch=master
[cv-url]: https://coveralls.io/github/fcanela/lifenastic-users?branch=master
[cq-image]: https://codeclimate.com/github/fcanela/lifenastic-users/badges/gpa.svg
[cq-url]: https://codeclimate.com/github/fcanela/lifenastic-users
[deps-image]: https://david-dm.org/fcanela/lifenastic-users.svg
[deps-url]: https://david-dm.org/fcanela/lifenastic-users
[dev-deps-image]: https://david-dm.org/fcanela/lifenastic-users/dev-status.svg
[dev-deps-url]: https://david-dm.org/fcanela/lifenastic-users#info=devDependencies
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE