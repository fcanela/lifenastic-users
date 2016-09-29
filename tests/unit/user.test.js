'use strict';

const assert = require('assert');

const usersResPath = '../../src/resources/users/';
describe('User module', () => {
    describe('list command', () => {
        const depsMock = require('./users.list.mocks');
        const handler = require(usersResPath + 'users.list').handler;

        it('should list all users', (done) => {
            handler({}, depsMock, (err, users) => {
                if (err) return done(err);

                assert.ok(users instanceof Array, 'is an array');
                assert.notEqual(users.length, 0, 'contains users');
                assert.equal(users[0].id, '1', 'contains the first user');
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

    describe('authenticate command', () => {
        const depsMock = require('./users.authenticate.mocks');
        const handler = require(usersResPath + 'users.authenticate').handler;

        function invalidCheck(credentials) {
            return function(done) {
                handler(credentials, depsMock, (err, reply) => {
                    if (err) return done(err);
                    if (reply.error) return done(reply.error);

                    const result = reply.authenticated;
                    assert.strictEqual(result, false, 'rejects wrong credentials');

                    done();
                });
            }
        }

        it('should not authenticate incorrect credentials', (done) => {
            const credentials = {
                email: 'test@email.example',
                hash: 'invalidhash'
            };

            handler(credentials, depsMock, (err, reply) => {
                if (err) return done(err);
                if (reply.error) return done(reply.error);

                const result = reply.authenticated;
                assert.strictEqual(result, false, 'rejects wrong credentials');

                done();
            });
        });

        it('should authenticate correct credentials', (done) => {
            const credentials = {
                email: 'test@email.example',
                hash: 'validhash'
            };

            handler(credentials, depsMock, (err, reply) => {
                if (err) return done(err);
                if (reply.error) return done(reply.error);

                const result = reply.authenticated;
                assert.strictEqual(result, true, 'authenticates correctly');

                done();
            });
        });

        it('should not authenticate non existing users', (done) => {
            const credentials = {
                email: 'unknownemail@email.example',
                hash: 'whatever'
            };

            handler(credentials, depsMock, (err, reply) => {
                if (err) return done(err);
                if (reply.error) return done(reply.error);

                const result = reply.authenticated;
                assert.strictEqual(result, false);

                done();
            });
        });
    });
});
