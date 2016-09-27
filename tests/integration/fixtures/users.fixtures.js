'use strict';

const tableName = 'users';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            const promises = [];

            insert({
                id: 1, email: 'user@example.com',
                hash: '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu'
            });

            return Promise.all(promises);

            function insert(value) {
                const now = (new Date()).toISOString();
                value.lastAccess = now;
                value.createdAt = now;
                value.updatedAt = now;
                promises.push(knex(tableName).insert(value));
            };
        });

};

