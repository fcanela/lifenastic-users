'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
const depsMock = require('./users.list.mocks');
const handler = require(usersResPath + 'users.list').handler;

describe('User module list handler', () => {
    it('should list all users', (done) => {
        handler({}, depsMock, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');

            const users = reply.users;
            assert.ok(users instanceof Array, 'is an array');
            assert.notEqual(users.length, 0, 'contains users');
            assert.equal(users[0].id, '1', 'contains the first user');
            done();
        });
    });

    it('should not contain any hash', (done) => {
        handler({}, depsMock, (err, reply) => {
            if (err) return done(err);
            assert.strictEqual(reply.errors.length, 0, 'returned errors');

            reply.users.forEach((user) => {
                assert.equal(user.hash, undefined, 'has no hash property');
            });
            done();
        });
    });

});
