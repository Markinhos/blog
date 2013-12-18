var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DatabaseProvider = function(db_name, host, port) {
  var _db = new Db(db_name, new Server(host, port, {auto_reconnect: true}, {}));
  _db.open(function(error, db){
  	if (error) console.log("Error opening connection");
  	else console.log("Connection successful!");
  });
  return {
  	db : _db
  }
};

exports.DatabaseProvider = DatabaseProvider