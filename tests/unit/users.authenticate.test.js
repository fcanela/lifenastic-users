'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
const depsMock = require('./users.authenticate.mocks');
const includesErrorCode = require('../helpers/includes_error_code');
const handler = require(usersResPath + 'users.authenticate').handler;

describe('User module authenticate handler', () => {
    it('should not authenticate incorrect password hash', (done) => {
        const credentials = {
            email: 'test@email.example',
            hash: 'invalidhash'
        };
        handler(credentials, depsMock, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'returned no errors');
            assert.ok(includesErrorCode(reply, 'InvalidPassword'), 'InvalidPassword error not returned');

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'accepted invalid credentials');

            done();
        });
    });


    it('should not authenticate non existing users', (done) => {
        const credentials = {
            email: 'unknownemail@email.example',
            hash: 'whatever'
        };
        handler(credentials, depsMock, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'returned no errors');
            assert.ok(includesErrorCode(reply, 'UserNotFound'), 'UserNotFound error not returned');

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'accepted invalid credentials');

            done();
        });
    });

    it('should authenticate correct credentials', (done) => {
        const credentials = {
            email: 'test@email.example',
            hash: 'validhash'
        };

        handler(credentials, depsMock, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');
            const result = reply.authenticated;
            assert.strictEqual(result, true, 'authenticates correctly');

            done();
        });
    });
});
