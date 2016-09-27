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
        let msg = {
            role: 'users',
            cmd: 'list'
        };

        service.act(msg, function (err, list) {
            if (err) return done(err);
            assert.notEqual(list.length, 0, 'list have some elements');
            const firstItem = list[0];
            assert.deepEqual(firstItem.id, '1', 'is able to get the first record');
            assert.deepEqual(firstItem.hash, undefined, 'no hash is shown');
            done();
        });
    });
});
