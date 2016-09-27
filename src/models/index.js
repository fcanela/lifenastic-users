'use strict';

module.exports = function loadModels(db) {
    const models = {};

    const Users = require('./users.model');
    models.Users = new Users(db);

    return models;
};
