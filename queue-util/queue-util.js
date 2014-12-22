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
/*
 *Module pattern: export a named object:
 *see http://darrenderidder.github.io/talks/ModulePatterns/#/9
*/
'use strict';

var amqp = require('amqp');
var Queue = function Queue() {};

/**
Publishes a message in Rabbitmq
callback(error): On success error will be null.
*/
Queue.prototype.publish = function(rabbitmqConnectionOptions, rabbitmqImplOptions, exchangeName, exchangeOptions, payload, routingKey, callback) {
  var connection = amqp.createConnection(rabbitmqConnectionOptions, rabbitmqImplOptions);
  connection.on('ready', function () {
    console.log('Connection ready!');
    connection.exchange(exchangeName, exchangeOptions, function(exchange) {
      console.log('Exchange ready!');
      exchange.publish(routingKey, payload);
      console.log('Done!');
      connection.disconnect();
      callback(null);  // Success
    });
  });
  
  connection.addListener('error', function (error) {
    console.error(error);
    console.error(error.stack);
    callback(error);
  });
};

//exports
exports.Queue = new Queue();
