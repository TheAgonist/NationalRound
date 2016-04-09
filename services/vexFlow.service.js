var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDB = db.get('records');
var Q = require('q');
var _ = require('lodash');

var service = {};

service.getRecordByID = getRecordByID;
service.getAll = getAll;
service.update = update;

module.exports = service;
    
function getRecordByID(id) {
    var deferred = Q.defer();
    //console.log(userParams);
    recordsDb.find({_id: id},{},function (err, record) {
        if (err) deferred.reject(err);
        if (record) {
            console.log(record);
            deferred.resolve(record);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}
function getAll(_id){
    var deferred = Q.defer();

    recordsDB.find({},{sort : { upvote : -1 } },function (err, record) {
        if (err) deferred.reject(err);
        if (record) {
            // return user (without hashed password)
            deferred.resolve(_.omit(record, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function update(_id, recordParam) {
    var deferred = Q.defer();
        var set = {
            upvote: Number(recordParam.upvote)+1,
        };
        //console.log(_id);
        recordsDB.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });

    return deferred.promise;
}
