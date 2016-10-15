'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
const depsMock = require('./users.create.mocks');
const includesErrorCode = require('../helpers/includes_error_code');
const handler = require(usersResPath + 'users.create').handler;

describe('User module create handler', () => {
    it('should create an user and provide its id', (done) => {
        const newUser = {
            email: 'valid@email.example',
            hash: '$2a$12$HPTH.pxPFFCwLUxlMNuBf.AMxRq9OeO84tpMs6T.kRTsr1pCstSbi'
        };
        handler(newUser, depsMock, (err, reply) => {
            if (err) return done (err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');
            assert(reply.user.id > 0, 'id field not returned');
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
            assert.ok(includesErrorCode(reply, 'EmailRequired'), 'missing empty email field error');

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
            assert.ok(includesErrorCode(reply, 'HashRequired'), 'missing empty hash field error');

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

            assert(reply.errors.length > 0, 'returned no errors with empty hash');
            assert.ok(includesErrorCode(reply, 'EmailAlreadyRegistered'), 'failed to detect an already registered email');
            done();
        });
    });
});
