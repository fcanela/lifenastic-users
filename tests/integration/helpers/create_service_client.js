const seneca = require('seneca');
const amqpTransport = require('seneca-amqp-transport');

const Service = require('../../../src');
const generateAMQPOptions = require('../../../src/amqp').generateOptions;

require('dotenv').config({ path: '../../../.env', silent: true });

function TestEnviroment(pins) {
    if (!(this instanceof TestEnviroment)) return new TestEnviroment();
};

module.exports = TestEnviroment;

const proto = TestEnviroment.prototype;

function createService(callback) {
    const instance = new Service();
    instance.start((err) => {
        if (err) return callback(err);
        callback(null, instance);
    });
};

function createClient(callback) {
    const instance = seneca({
        log: {
            level: 'error'
        }
    });
    instance.use(amqpTransport);
    instance.ready(function (err) {
        if (err) return callback(err);

        const options = generateAMQPOptions([{ role: 'users'}]);
        instance.client(options);
        callback(null, instance);
    });
}

proto.start = function startTestEnviroment(callback) {
    createService((err, srv) => {
        if (err) return callback(err);

        this.service = srv;
        createClient((err, client) => {
            if (err) return callback(err);

            this.client = client;
            callback (null, this.client);
        });
    });
};

proto.stop = function stopTestEnviroment(callback) {
    this.client.close(() => {
        this.service.stop(callback);
    });
};
