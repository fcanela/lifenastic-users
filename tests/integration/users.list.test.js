'use strict';

const assert = require('assert');
const service = require('../../src/service.js');
const installFixtures = require('./helpers/install_fixtures');

describe('User module list command', () => {
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
            assert.notStrictEqual(firstItem.id, undefined, 'is able to get the first record');
            assert.strictEqual(firstItem.hash, undefined, 'no hash is shown');
            done();
        });
    });
});
