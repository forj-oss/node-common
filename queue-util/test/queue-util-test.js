/**
*# (c) Copyright 2014 Hewlett-Packard Development Company, L.P.
*#
*#   Licensed under the Apache License, Version 2.0 (the "License");
*#   you may not use this file except in compliance with the License.
*#   You may obtain a copy of the License at
*#
*#       http://www.apache.org/licenses/LICENSE-2.0
*#
*#   Unless required by applicable law or agreed to in writing, software
*#   distributed under the License is distributed on an "AS IS" BASIS,
*#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*#   See the License for the specific language governing permissions and
*#   limitations under the License.
*/
'use strict';

var should = require('chai').should();
var queue_util = require('../queue-util.js').Queue;

var rabbitmq = {
    connection: {
      host: 'localhost',
      port: 5672,
      login: 'admin',
      password: 'changeme',
      vhost: 'maestro'
    },
    exchange_name: 'maestro_exch',
    exchange_options: { 
      type: 'topic', 
      passive: 'true',
      durable: 'true',
      autodelete: false,
      noDeclare: false,
      comfirm: false
    }
  };

describe('#QueueUtil', function() {
  it('publish a message', function(done){
    var rabbitmqConnectionOptions = rabbitmq.connection;
    var rabbitmqImplOptions = { defaultExchangeName: rabbitmq.exchange_name, reconnect: false };
    var exchangeName = rabbitmq.exchange_name;
    var exchangeOptions = rabbitmq.exchange_options;
    var payload = {test: true};
    var routingKey = 'project.foo.bar';

    queue_util.publish(rabbitmqConnectionOptions, rabbitmqImplOptions, exchangeName, exchangeOptions, payload, routingKey, function(error) {
      should.not.exist(error);
      done();
    });
  });
});
