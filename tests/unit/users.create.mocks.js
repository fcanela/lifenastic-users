'use strict';

const deps = {};

module.exports = deps;

deps.models = {};
deps.models.Users = {};

deps.models.Users.validateNew = function(newUser) {
    const missings = [];
    if (!newUser.email) missings.push('email');
    if (!newUser.hash) missings.push('hash');

    const collisions = [];
    if (newUser.email === 'alreadyRegistered@email.example') collisions.push('email');

    if (!missings.length && !collisions.length)
        return Promise.resolve();
    else
        return Promise.reject({ missings, collisions });
};

deps.models.Users.create = function(newUser) {
    return Promise.resolve({
        id: 29,
        email: 'valid@email.example'
    });
};
