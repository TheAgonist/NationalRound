var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDB = db.get('records');
var Q = require('q');
var _ = require('lodash');

var service = {};
service.getAll = getAll;
service.update = update;
module.exports = service;

function getAll(_id){
    var deferred = Q.defer();

    recordsDB.find({show: 1},{sort : { votes : -1 } },function (err, record) {
        if (err) deferred.reject(err);
        if (record) {
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
            votes: Number(recordParam.votes)+1,
        };
        recordsDB.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });

    return deferred.promise;
}