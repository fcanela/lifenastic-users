'use strict';

const assert = require('assert');
const service = require('../../src/service.js');
const installFixtures = require('./helpers/install_fixtures');
const includesErrorCode = require('./helpers/includes_error_code');

describe('User module create command', () => {
    beforeEach(function prepareTestingContext(done) {
        installFixtures().then(() => {
            done();
        }, done);;
    });

    it('should be able to create an user and return its id', (done) => {
        const msg = {
            role: 'users',
            cmd: 'create',
            email: 'newUserEmail@email.example',
            hash: '$2a$12$L3fGF5O9j6byBqyHfh.PfurE.hllp5Y2eiIKEWfHmqoTTX6jkxGHW'
        };

        service.act(msg, (err, reply) => {
            if (err) return done(err);
            if (reply.errors) return done(reply.errors);

            assert.notStrictEqual(reply.id, undefined, 'id field not returned');
            done();
        });
    });

    it('should not create users with missing fields', (done) => {
        const msg = {
            role: 'users',
            cmd: 'create'
        };

        service.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors, undefined, 'no errors detected');
            assert.ok(includesErrorCode(reply, 'EmailRequired'), 'missing email not detected');
            assert.ok(includesErrorCode(reply, 'HashRequired'), 'missing hash not detected');
            done();
        });
    });

    it('should not create users with already existing unique fields', (done) => {
        const msg = {
            role: 'users',
            cmd: 'create',
            email: 'existing@email.example',
            hash: '$2a$12$L3fGF5O9j6byBqyHfh.PfurE.hllp5Y2eiIKEWfHmqoTTX6jkxGHW'
        };

        service.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors, undefined, 'no errors detected');
            assert.ok(includesErrorCode(reply, 'EmailAlreadyRegistered'), 'missing email already registered');
            done();
        });
    });
});
