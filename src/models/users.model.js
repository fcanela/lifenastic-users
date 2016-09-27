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
