'use strict';

const command = {};
module.exports = command;

command.pattern = { cmd: 'authenticate' };

command.handler = function authenticateUser(msg, deps, respond) {
    const models = deps.models;
    const credentials = msg;

    const query = { email: credentials.email };

    models.Users.find(query).then(function returnResult(results) {
        if (results.length > 1) return tooManyResultsError();

        const errors = [];
        // If the user is not in the DB it returns "no authenticated"
        let authenticated = false;
        if (results.length === 0) {
            errors.push({
                code: 'UserNotFound',
                message: 'No registered user found with provided credentials'
            });
            return respond(null, { errors, authenticated });
        }

        const user = results[0];

        authenticated = credentials.hash === user.hash;
        if (!authenticated) {
            errors.push({
                code: 'InvalidPassword',
                message: 'Invalid credentials'
            });
        }

        respond(null, { errors, authenticated });

        function tooManyResultsError() {
            const err = new Error('Authentication obtained more than'
                    + 'one result for one email');
            // Log issue?
            respond(err);
        }

    }).catch(respond);
};
