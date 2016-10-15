'use strict';

const senecaFactory = require('seneca');
const addResources = require('./resources');
const listenAMQPTransport = require('./amqp').listenAMQPTransport;

function Service() {
}

module.exports = Service;

const proto = Service.prototype;

proto.start = function startService(callback) {
    this.db = require('./db');
    this.models = require('./models')(this.db);

    if (!isProduction()) loadConfigurationFromDotEnv();

    let senecaOptions = {};
    senecaOptions = {
        log: {
            level: 'error'
        }
    };

    this.seneca = senecaFactory(senecaOptions);
    addResources(this.seneca, { models: this.models });

    const pin = [{ role: 'users' }];

    listenAMQPTransport(this.seneca, pin, callback);
};

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

function loadConfigurationFromDotEnv() {
    require('dotenv').config({ path: '../../.env', silent: true });
}

proto.stop = function stopService(callback) {
    this.seneca.close(callback);
};
