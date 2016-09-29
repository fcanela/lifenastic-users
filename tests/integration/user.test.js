'use strict';

const assert = require('assert');
const service = require('../../src/service.js');
const installFixtures = require('./helpers/install_fixtures');

describe('User module', () => {
    beforeEach(function prepareTestingContext(done) {
        installFixtures().then(() => {
            done();
        }, done);;
    });

    it('should list all users without showing hashes', (done) => {
        const msg = {
            role: 'users',
            cmd: 'list'
        };

        service.act(msg, (err, list) => {
            if (err) return done(err);
            assert.notEqual(list.length, 0, 'list have some elements');
            const firstItem = list[0];
            assert.strictEqual(firstItem.id, '1', 'is able to get the first record');
            assert.strictEqual(firstItem.hash, undefined, 'no hash is shown');
            done();
        });
    });

    it('should authenticate users', (done) => {
        const msg = {
            role: 'users',
            cmd: 'authenticate',
            email: 'test@email.example',
            hash: '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu'
        };

        service.act(msg, (err, reply) => {
            if (err) return done(err);
            if (reply.error) return done (err);

            const result = reply.authenticated;
            assert.strictEqual(result, true, 'user is correctly authenticated');

            done();
        });
    });

    it('should not authenticate with invalid credentials ', (done) => {
        const msg = {
            role: 'users',
            cmd: 'authenticate',
            email: 'test@email.example',
            hash: 'randominvalidtoken'
        };

        service.act(msg, (err, reply) => {
            if (err) return done(err);
            if (reply.error) return done (err);

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'invalid credentials are not authenticated');

            done();
        });
    });
});
