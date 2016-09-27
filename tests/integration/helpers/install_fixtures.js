'use strict';


const config = require('../../../db/config');
config.seeds.directory = __dirname + '/../fixtures';

const knex = require('knex')(config);

module.exports = function installFixtures() {
    return knex.seed.run();
}

