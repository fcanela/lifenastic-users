'use strict';

const knex = require('knex');
const config = require('../db/config');

module.exports = knex(config);
