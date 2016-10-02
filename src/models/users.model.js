'use strict';

const tableName = 'users';

function Users(db) {
    this.db = db;
}

module.exports = Users;

const proto = Users.prototype;

proto.find = function findUsers(query={}, fields='*') {
    return this.db(tableName).select(fields).where(query);
};

proto.validateNew = function validateNewUser(newUser) {
    // Missing fields check
    const missings = [];
    if (!newUser.email) missings.push('email');
    if (!newUser.hash) missings.push('hash');

    if (missings.length > 0) return Promise.reject({ missings });

    // Already existing fields check
    const uniqueFields = ['email'];
    return this.db(tableName).select(uniqueFields).where('email', newUser.email)
        .then(function(results) {
            if (results.length === 0) return Promise.resolve();

            const collisions = getCollisions();
            return Promise.reject({ collisions });

            function getCollisions() {
                const collisions = new Set();
                results.forEach((user) => {
                    uniqueFields.forEach((field) => {
                        const collision = user[field] === newUser[field];
                        if (collision) collisions.add(field);
                    });
                });

                return Array.from(collisions);
            }
        });
};

proto.create = function createUser(newUser) {
    const now = (new Date()).toISOString();

    const data = {
        email: newUser.email,
        hash: newUser.hash,
        createdAt: now,
        updatedAt: now
    };

    return this.db(tableName).insert(data, 'id')
        .then(function(result) {
            return Promise.resolve({ id: result[0] });
        })
        .catch(function handleUserCreationFailure(err) {
            return Promise.reject(err);
        });
};
