'use strict';

const resource = {};
module.exports = resource;

resource.role = 'users';

resource.commands = [
    require('./users.list'),
    require('./users.authenticate')
];
