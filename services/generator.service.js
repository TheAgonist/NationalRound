var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDB = db.get('records');
var Q = require('q');
var _ = require('lodash');

var service = {};
service.generate = generate;
module.exports = service;

function generate(){

    
}



