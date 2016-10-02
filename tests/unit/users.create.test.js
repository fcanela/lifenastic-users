'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
const depsMock = require('./users.create.mocks');
const handler = require(usersResPath + 'users.create').handler;

describe('User module create handler', () => {
    it('should create an user and provide its id', (done) => {
        const newUser = {
            email: 'valid@email.example',
            hash: '$2a$12$HPTH.pxPFFCwLUxlMNuBf.AMxRq9OeO84tpMs6T.kRTsr1pCstSbi'
        };
        handler(newUser, depsMock, (err, reply) => {
            if (err) return done (err);
            if (reply.error) return done(reply.error);

            assert(reply.id > 0, 'id field not returned');
            done();
        });
    });

    it('should fail when email is not provided', (done) => {
        const newUser = {
            hash: '$2a$12$HPTH.pxPFFCwLUxlMNuBf.AMxRq9OeO84tpMs6T.kRTsr1pCstSbi'
        };
        handler(newUser, depsMock, (err, reply) => {
            if (err) return done (err);
            assert(reply.errors.length > 0, 'returned no errors with empty email');
            const error = reply.errors[0];
            assert.strictEqual(error.code, 'EmailRequired', 'failed to recognize missing email field');

            done();
        });
    });

    it('should fail when hash is not provided', (done) => {
        const newUser = {
            email: 'valid@email.example'
        };
        handler(newUser, depsMock, (err, reply) => {
            if (err) return done (err);
            assert(reply.errors.length > 0, 'returned no errors with empty hash');
            const error = reply.errors[0];
            assert.strictEqual(error.code, 'HashRequired', 'failed to recognize missing hash field');

            done();
        });
    });

    it('should fail when email is already registered', (done) => {
        const newUser = {
            email: 'alreadyRegistered@email.example',
            hash: '$2a$12$HPTH.pxPFFCwLUxlMNuBf.AMxRq9OeO84tpMs6T.kRTsr1pCstSbi'
        };
        handler(newUser, depsMock, (err, reply) => {
            if (err) return done (err);

            assert(reply.errors.length > 0, 'returned no errors with already registed email');
            const error = reply.errors[0];
            assert.strictEqual(error.code, 'EmailAlreadyRegistered', 'failed to detect an already registered email');
            done();
        });
    });
});
