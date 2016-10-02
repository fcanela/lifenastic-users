'use strict';

const command = {};
module.exports = command;

command.pattern = { cmd: 'create' };

command.handler = function authenticateUser(msg, deps, respond) {
    const models = deps.models;
    const newUser = msg;

    models.Users.validateNew(newUser)
    .then(function validFields() {
        return models.Users.create(newUser);
    })
    .then(function userCreated(user) {
        respond(null, user);
    })
    .catch(function(err) {
        if (err instanceof Error) return respond(err);

        const errors = [];

        // Missing fields
        if (err.missings) {
            err.missings.forEach((field) => {
                const capitalized = capitalize(field);
                errors.push({
                    code: `${capitalized}Required`,
                    message: `${capitalized} field is mandatory`
                });
            });
        }

        // Non-unique fields
        if (err.collisions) {
            err.collisions.forEach((field) => {
                const capitalized = capitalize(field);
                errors.push({
                    code: `${capitalized}AlreadyRegistered`,
                    message: `${capitalized} already registered`
                });
            });
        }

        respond(null, { errors });

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    });
};

