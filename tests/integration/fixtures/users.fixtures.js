'use strict';

const tableName = 'users';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            const promises = [];

            insert({
                email: 'test@email.example',
                hash: '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu'
            });

            insert({
                email: 'existing@email.example',
                hash: '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu'
            });

            return Promise.all(promises);

            function insert(value) {
                const now = (new Date()).toISOString();
                value.createdAt = now;
                value.updatedAt = now;
                promises.push(knex(tableName).insert(value));
            };
        });

};

