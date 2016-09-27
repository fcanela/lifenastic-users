'use strict';

const deps = {};

module.exports = deps;

deps.models = {};
deps.models.Users = {};

deps.models.Users.find = function() {
    var result = [];

    function add(email, hash) {
        result.push({
            id: (result.length + 1).toString(),
            email: email,
            hash: hash,
            created: new Date(),
            updated: new Date()
        });
    }

    add('test@email.example', 'randomhash');
    add('test2@email.example', 'anotherhash');

    return Promise.resolve(result);
};
