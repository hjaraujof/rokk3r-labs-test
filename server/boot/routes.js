'use strict';

module.exports = function(app) {
  var request = require('request');
  // Install a "/ping" route that returns "pong"
  app.get('/', function(req, res) {
    res.render('index', {search: '', result: ''});
  });
  app.post('/', function(req, res) {
    var search = req.body.search;
    var result = [];
    var promises = [];
    var promises2 = [];
    promises.push(
      new Promise(function(resolve, reject) {
        app.models.Brand.find({where: {id: {nlike: '0'}}}, function(err, obj) { resolve(obj); });
      })
    );
    promises.push(
      new Promise(function(resolve, reject) {
        app.models.ClothingType.find({where: {id: {nlike: '0'}}}, function(err, obj) { resolve(obj); });
      })
    );
    Promise.all(promises).then(function(values) {
      var brands = values[0];
      var ctypes = values[1];
      var i;
      var search2 = String(search).toLowerCase();
      brands = Object.keys(brands).map(function(k) { return String(brands[k].name).toLowerCase(); });
      ctypes = Object.keys(ctypes).map(function(k) { return String(ctypes[k].name).toLowerCase(); });
      //console.log(brands); console.log(ctypes); console.log(search2);
      promises2 = new Promise(function(resolve, reject) {
        for (i = 0; i < brands.length; i++) {
          search2 = search2.split(brands[i]).join(brands[i].bold());
        }
        for (i = 0; i < ctypes.length; i++) {
          search2 = search2.split(ctypes[i]).join(ctypes[i].italics());
        }
        resolve(search2);
      });
      promises2.then(function(value) {
        console.log(value);
        res.render('index', {search: search, result: value});
      }, function(reason) {
        console.log(reason);
      })
    }, reason => {
      console.log(reason);
    });
  });
}