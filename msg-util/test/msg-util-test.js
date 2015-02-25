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

var msg = require('../msg-util.js').Message;
var should = require('chai').should();


describe("# Message", function() {

  it("should create a valid message", function(done) {
    var options = {
      message: {  
        action: {
          context : 'project.create.foo',
          ctx_data: {
            name : 'project foo',
            description: 'foo project'
          }
        },
        ACL: {
          user: 'wenlock@hp.com',
          role: 'admin'
        },
        debug: true,
        log: {
          enable: true,
            level: 'info',
            target: 'myfoo'
          },
        origin: 'util',
        site_id: '19m',
        time_stamp: new Date().toISOString()
      }
    };
    msg.isValid(options, function (error){
        should.exist(error);
        done();
      });
  });


  it("should validate missing site_id", function(done) {
    var options = {
      message: {  
        action: {
          context : 'project.create.foo',
          ctx_data: {
            name : 'project foo',
            description: 'foo project'
          }
        },
        ACL: {
          user: 'wenlock@hp.com',
          role: 'admin'
        },
        debug: true,
        log: {
          enable: true,
            level: 'info',
            target: 'myfoo'
          },
        origin: 'util',
        time_stamp: new Date().toISOString()
      }
    };
    msg.isValid(options, function (error){
      should.exist(error);
      done();
    });
  });


  it("should validate datetime", function(done) {
    var options = {
        message: {  
          action: {
            context : 'project.create.foo',
            ctx_data: {
              name : 'project foo',
              description: 'foo project'
            }
          },
          ACL: {
            user: 'wenlock@hp.com',
            role: 'admin'
          },
          debug: true,
          log: {
            enable: true,
              level: 'info',
              target: 'myfoo'
            },
          origin: 'util',
          time_stamp: 'THIS IS NOT A DATE'
        }
      };
    msg.isValid(options, function (error){
      should.exist(error);
      done();
    });
  });


  it("should validate missing time_stamp", function(done) {
    var options = {
      message: {  
        action: {
          context : 'project.create.foo',
          ctx_data: {
            name : 'project foo',
            description: 'foo project'
          }
        },
        ACL: {
          user: 'wenlock@hp.com',
          role: 'admin'
        },
        debug: true,
        log: {
          enable: true,
            level: 'info',
            target: 'myfoo'
          },
        origin: 'util',
        site_id: '19m'
      }
    };
    msg.isValid(options, function (error){
      should.exist(error);
      done();
    });
  });
});