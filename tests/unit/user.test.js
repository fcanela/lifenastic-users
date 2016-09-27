'use strict';

const assert = require('assert');
const depsMock = require('./deps.mock');

describe('User module', () => {
    describe('list command', () => {
        const handler = require('../../src/resources/users/users.list').handler;

        it('should list all users', (done) => {
            handler({}, depsMock, (err, users) => {
                if (err) return done(err);

                assert.ok(users instanceof Array, 'is an array');
                assert.notEqual(users.length, 0, 'contains users');
                assert.equal(users[0].id, '1', 'contains the first user');
                //assert(users[0].hash === undefined);
                done();
            });
        });

        it('should not contain any hash', (done) => {
            handler({}, depsMock, (err, users) => {
                if (err) return done(err);
                users.forEach((user) => {
                    assert.equal(user.hash, undefined, 'has no hash property');
                });
                done();
            });
        });

    });
});
