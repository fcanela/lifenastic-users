'use strict';

module.exports = function arrayIncludesErrorCode(reply, errorCode) {
    return reply.errors.some((err) => {
        return err.code === errorCode;
    });
};
