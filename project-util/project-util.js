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

var helper = require('./lib/helpers.js');
var Projects = function Projects() {};

Projects.getAllProjects = function(requestUrl) {
  var options = helper.createConfig(requestUrl);
  helper.checkValidCertificate(requestUrl, options, function(error, stdout, stderr){
    if (!error){
      helper.getAllProjects(stdout, requestUrl, null, null, function(error, stdout, stderr){
        if(!error){
          return stdout;
        }else{
          console.log(stderr);
          return false;
        }
      });
    }else{
      console.log(stderr);
      return false;
    }
  });
};

Projects.getProjectsByRange = function(requestUrl, limit, skip) {
  var options = helper.createConfig(requestUrl);
  helper.checkValidCertificate(requestUrl, options, function(error, stdout, stderr){
    if (!error){
      helper.getAllProjects(stdout, requestUrl, limit, skip, function(error, stdout, stderr){
        if(!error){
          return stdout;
        }else{
          console.log(stderr);
          return false;
        }
      });
    }else{
      console.log(stderr);
      return false;
    }
  });
};

exports.Projects = new Projects();
