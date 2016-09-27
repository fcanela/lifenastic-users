'use strict';

// This configuration is the same for the service and npm tasks (migrations,
// rollbacks, etc)

// Load enviroment variables from .env file if we're not in production
if (!isProduction()) {
    const path = __dirname + '/../.env';
    require('dotenv').config({ path, silent: true });
}

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

module.exports = {
    client: 'postgres',
    connection: {
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        password: process.env.POSTGRESQL_PASSWORD,
        user: process.env.POSTGRESQL_USER,
        database: process.env.POSTGRESQL_DATABASE,
        timezone: 'UTC'
    },
    migrations: {
        tableName: '_db_migration',
        directory: `${__dirname}/migrations`,
    },
    seeds: {
        directory: `${__dirname}/seeds`,
    },
    pool: {
        min: 1,
        max: 10
    }
};

