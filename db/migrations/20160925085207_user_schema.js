'use strict';

const tableName = 'users';

exports.up = function migrationUp(knex) {
    return knex.schema.createTable(tableName, function createTable (table) {
        table.bigIncrements('id').primary();
        table.string('email', 255).notNullable();
        // It will be a bcrypt'ed hash
        table.string('hash', 60).notNullable();
        // Timestamps with timezone
        table.timestamp('lastAccess', false).notNullable();
        table.timestamp('createdAt', false).notNullable();
        table.timestamp('updatedAt', false).notNullable();
    });
};

exports.down = function migrationDown(knex) {
    return knex.schema.dropTableIfExists(tableName);
};
