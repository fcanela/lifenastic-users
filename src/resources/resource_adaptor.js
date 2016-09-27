'use strict';

const _ = require('lodash');

module.exports = function (dirname, deps, seneca) {
    const resource = require('./' + dirname);
    const basePattern = { role : resource.role };

    resource.commands.forEach((command) => {
        configureCommand(command, deps);
    });

    function configureCommand(command, deps) {
        const pattern = seneca.util.deepextend(command.pattern, basePattern);

        const handlerDeps = _.clone(deps);
        handlerDeps.seneca = this;

        const handler = function handler(msg, respond) {
            return command.handler(msg, handlerDeps, respond);
        };

        seneca.use(function configure() {
            this.add(pattern, handler);
        });
    }
};
