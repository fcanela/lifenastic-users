'use strict';

const assert = require('assert');
const installFixtures = require('./helpers/install_fixtures');

describe('User module list command', () => {
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

    it('should list all users without showing hashes', (done) => {
        const msg = {
            role: 'users',
            cmd: 'list'
        };

        client.act(msg, (err, list) => {
            if (err) return done(err);
            assert.notEqual(list.length, 0, 'empty list returned');
            const firstItem = list[0];
            assert.notStrictEqual(firstItem.id, undefined, 'unable to get first record');
            assert.strictEqual(firstItem.hash, undefined, 'users hash returned');
            done();
        });
    });
});
