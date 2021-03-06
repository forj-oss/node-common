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

var Msg = require('./model/message');

var Message = function Message() {};

/**
 Create a stringified json message
*/
Message.prototype.createMessage = function(options) {
  var msg =  new Msg(options);
  return msg.getMsg();
};

/**
 Create a JSON message
*/
Message.prototype.getJSON = function(options) {
  var msg =  new Msg(options);
  return msg.getJSON();
};

/**
 Validates if message meets schema
 returns: true or false
*/
Message.prototype.isValid = function(options, callback) {
  var msg =  new Msg(options);
  msg.isValid( function (error){
    if (error){
      callback(error); 
    }else {
      callback(null); // Success
    }
  });
};

//exports
exports.Message = new Message();
