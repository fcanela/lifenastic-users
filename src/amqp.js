'use strict';


const amqp = {};

module.exports = amqp;

amqp.generateOptions = function generateOptions(pins) {
    const hostname = process.env.AMQP_HOST;
    const port = process.env.AMQP_PORT;
    const username = process.env.AMQP_USER;
    const password = process.env.AMQP_PASSWORD || null;
    const vhost = process.env.AMQP_VHOST || '/';

    const options = {
        type: 'amqp',
        hostname,
        port,
        username,
        password,
        vhost,
        exchange: {
            name: 'lifenastic.topic'
        },
        queues: {
            action: {
                prefix: 'lifenastic'
            },
            response: {
                prefix: 'lifenastic.res'
            }
        }
    };

    if (pins) options.pin = pins;

    return options;
};

amqp.listenAMQPTransport = function listenAMQP(seneca, pins, callback) {
    const options = amqp.generateOptions(pins);
    seneca.use(require('seneca-amqp-transport'));

    seneca.ready(function(err) {
        if (err) {
            if (callback) callback(err);
            return;
        }
        seneca.listen(options);
        if (callback) callback(null);
    });
};
