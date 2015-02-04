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

var crypto = require('crypto');
var config = require('./config');

module.exports = {
  //Encrypts a string
  encrypt: function(text){
    var cipher = crypto.createCipher(config.algorithm, config.password);
    var crypted = cipher.update(text, config.input, config.output);
    crypted += cipher.final(config.output);
    return crypted;
  },
  //Decrypts a string
  decrypt: function(text){
    var decipher = crypto.createDecipher(config.algorithm, config.password);
    var dec = decipher.update(text, config.output, config.input);
    dec += decipher.final(config.input);
    return dec;
  }
};