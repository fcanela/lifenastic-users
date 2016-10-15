'use strict';

const assert = require('assert');
const installFixtures = require('./helpers/install_fixtures');
const includesErrorCode = require('../helpers/includes_error_code');

describe('User module authenticate command', () => {
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

    it('should authenticate users', function(done) {
        const msg = {
            role: 'users',
            cmd: 'authenticate',
            email: 'test@email.example',
            hash: '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);
            if (reply.errors.length > 0) return done(new Error(JSON.stringify(reply.errors)));

            const result = reply.authenticated;
            assert.strictEqual(result, true, 'rejected valid credentials');

            done();
        });
    });

    it('should not authenticate with invalid password', (done) => {
        const msg = {
            role: 'users',
            cmd: 'authenticate',
            email: 'test@email.example',
            hash: 'randominvalidhash'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'returned no errors');
            assert.ok(includesErrorCode(reply, 'InvalidPassword'), 'InvalidPassword error not returned');

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'accepted invalid credentials');

            done();
        });
    });
});
