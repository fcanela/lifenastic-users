'use strict';

let senecaOptions = {};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../../.env', silent: true });

    senecaOptions = {
        log: 'test',
        debug: {
            fragile: true,
        }
    };
}

const seneca = require('seneca')(senecaOptions);

const db = require('./db');

const models = require('./models')(db);

const addResources = require('./resources');
addResources(seneca, { models });

module.exports = seneca;
