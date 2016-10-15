'use strict';

const assert = require('assert');
const installFixtures = require('./helpers/install_fixtures');
const includesErrorCode = require('../helpers/includes_error_code');

describe('User module create command', () => {
    let testEnv;
    let client;
    before(function prepareTestingContext(done) {
        const TestEnviroment = require('./helpers/create_service_client.js');
        testEnv = new TestEnviroment();
        testEnv.start(function settingUpVars(err, createdClient) {
            if (err) return done(err);
            client = createdClient;
            done();
        });
    });

    after(function cleanUp(done) {
        testEnv.stop(done);
    });

    beforeEach(function prepareTest(done) {
        installFixtures().then(() => {
            done();
        }, done);
    });

    it('should be able to create an user and return its id', (done) => {
        const msg = {
            role: 'users',
            cmd: 'create',
            email: 'newUserEmail@email.example',
            hash: '$2a$12$L3fGF5O9j6byBqyHfh.PfurE.hllp5Y2eiIKEWfHmqoTTX6jkxGHW'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'errors detected');
            assert.notStrictEqual(reply.user.id, undefined, 'id field not returned');
            done();
        });
    });

    it('should not create users with missing fields', (done) => {
        const msg = {
            role: 'users',
            cmd: 'create'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'no errors detected');
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

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'no errors detected');
            assert.ok(includesErrorCode(reply, 'EmailAlreadyRegistered'), 'missing email already registered');
            done();
        });
    });
});
