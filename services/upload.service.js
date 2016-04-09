var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDb = db.get('records');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.create = createRecord;
service.get = getAllRecordsForUser;
service.update = update;
module.exports = service;

function createRecord(record) {   
    var deferred = Q.defer();
    recordsDb.insert(
        record,
        function (err, doc) {
            if (err) deferred.reject(err);
            
            deferred.resolve();
        });

    return deferred.promise;
}

function getAllRecordsForUser(user) {
    var deferred = Q.defer();
    recordsDb.find({user: user},{sort : { votes : -1 } },function (err, record) {
    if (err) deferred.reject(err);
    if (record) {
        //console.log(record);
        deferred.resolve(record);
    } else {
        deferred.resolve();
    }
    });
    return deferred.promise;
}

function update(_id, recordParam) {
    var deferred = Q.defer();
        var set = {
            show: ~recordParam.show,
        };
        recordsDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });

    return deferred.promise;
}
