'use strict';

const deps = {};

module.exports = deps;

deps.models = {};
deps.models.Users = {};

deps.models.Users.find = function(query) {
    let result = [];
    if (query.email === 'test@email.example') {
        result = [{
            email: 'test@email.example',
            hash: 'validhash'
        }];
    } else {
        result = [];
    }

    return Promise.resolve(result);
};
