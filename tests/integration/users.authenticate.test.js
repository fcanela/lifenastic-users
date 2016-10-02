'use strict';

const assert = require('assert');
const service = require('../../src/service.js');
const installFixtures = require('./helpers/install_fixtures');

describe('User module authenticate command', () => {
    beforeEach(function prepareTestingContext(done) {
        installFixtures().then(() => {
            done();
        }, done);;
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
            if (reply.error) return done(reply.error);

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
            if (reply.error) return done(reply.error);

            const result = reply.authenticated;
            assert.strictEqual(result, false, 'invalid credentials are not authenticated');

            done();
        });
    });
});
