module.exports = function(app,next) {
    'use strict'
    var _ = require('lodash');
    var path = require('path');
    var dsByConnector = {};
    const datasources = require(path.resolve(__dirname, '../datasources.json'));
    _.mapKeys(datasources,function(value, key){
      if(!dsByConnector[value.connector]) dsByConnector[value.connector] = [];
      dsByConnector[value.connector].push(key);
    });
  
    console.log('------------------------------------------------');
    console.log('Checking datasources syncronization.');
    //console.log('------------------------------------------------');
  
    var promises = [];
    for (var connector in dsByConnector) {
      if (dsByConnector.hasOwnProperty(connector)) {
        dsByConnector[connector].forEach(function(dbName){
          var promise = new Promise((resolve,reject) =>
          {
            let db = app.dataSources[dbName];
            db.autoupdate((err, result) => {
              if (err) reject(err);
              resolve(`${dbName} update successful!`);
            });
          });
          promises.push(promise);
        });
      }
    }
    Promise.all(promises).then(values => {
      for (var i = 0; i < values.length; i++) {
        console.log(values[i]);
      }
      console.log('------------------------------------------------');
      next();
    }, reason => {
      console.log(reason);
      console.log("Check model definitions-> model-config.json");
      console.log('------------------------------------------------');
      next();
    });
  
  }
  