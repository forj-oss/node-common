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
var helper = require('../lib/helpers');
var requestUrl = 'review.forj.io';
var requestValidCertificate = true;
var config = helper.createConfig(requestUrl);

describe('#Projects', function() {
  it('get all project from the gerrit API', function() {

    helper.getProjects(requestValidCertificate, requestUrl, null, null, function (error, stdout, stderr) {
      should.not.exist(error);
      should.not.exist(stderr);
      should.exist(stdout);
    });
  });
});

describe('#Projects', function() {
  it('get a valid certificate', function() {

    helper.checkValidCertificate(requestUrl, config, function (error, stdout, stderr) {
      should.not.exist(error);
      should.not.exist(stderr);
      should.exist(stdout);
    });
  });
});
