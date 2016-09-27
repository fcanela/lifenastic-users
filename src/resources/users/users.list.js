'use strict';

const command = {};
module.exports = command;

command.pattern = { cmd: 'list' };
command.handler = function listUsers(msg, deps, respond) {
    const models = deps.models;
    models.Users.find().then(function processData(users) {
        users.map((user) => {
            delete user.hash;
        });

        respond(null, users);
    }).catch(respond);
};


