/**
(c) Copyright 2014 Hewlett-Packard Development Company, L.P.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
'use strict';

var unirest = require('unirest');
var https = require('https');

module.exports = {

  checkValidCertificate: function(requestUrl, options, callback){

    var req = https.request(options, function (res) {
      if (requestUrl !== null){
        callback(null, res.socket.authorized, null);
      }else{
        console.error('Gerrit Server Not Found.');
        callback(true, null, 'Gerrit Server Not Found.');
      }
    });

    req.on('error', function(e) {
      callback(e, null, null);
    });

    req.end();

  },

  getProjects: function(secureCertificate, requestUrl, limit, skip, callback){

    if (requestUrl !== null){
      var query = (limit === null && skip === null) ?
      'https://' + requestUrl + '/projects/?d' :
      'https://' + requestUrl + '/projects/?n=' + limit + '&S=' + skip;
      unirest.get(query)
      .headers({ 'Accept': 'application/json' })
      .strictSSL(secureCertificate)
      .end(function (response) {
        var obj = JSON.parse(response.body.substring(4));
        callback(null, obj, null);
      });
    }else{
      console.error('Config.json doesnt have a Gerrit section');
      callback(true, null, 'Config.json doesnt have a Gerrit section');
    }

  },

  createConfig : function(requestUrl){
    return {
      host: requestUrl,
      method: 'get',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
    };
  }
};
