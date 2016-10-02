'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
const depsMock = require('./users.authenticate.mocks');
const handler = require(usersResPath + 'users.authenticate').handler;

describe('User module authenticate handler', () => {
    it('should not authenticate incorrect credentials', (done) => {
        const credentials = {
            email: 'test@email.example',
            hash: 'invalidhash'
        };
        shouldBeInvalid(credentials, done);
    });

    it('should authenticate correct credentials', (done) => {
        const credentials = {
            email: 'test@email.example',
            hash: 'validhash'
        };

        handler(credentials, depsMock, (err, reply) => {
            if (err) return done(err);
            if (reply.error) return done(reply.error);

            const result = reply.authenticated;
            assert.strictEqual(result, true, 'authenticates correctly');

            done();
        });
    });

    it('should not authenticate non existing users', (done) => {
        const credentials = {
            email: 'unknownemail@email.example',
            hash: 'whatever'
        };
        shouldBeInvalid(credentials, done);
    });

    function shouldBeInvalid(credentials, done) {
        handler(credentials, depsMock, (err, reply) => {
            if (err) return done(err);
            if (reply.error) return done(reply.error);

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'rejects wrong credentials');

            done();
        });
    }
});
