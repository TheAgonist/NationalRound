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
service.create = createRecord;
service.getAllRecordsForUser = getAllRecordsForUser;
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

function update(req) {
    var deferred = Q.defer();
    recordParam = req.body;
    action = req.route.path;
    console.log(action);
    if(action == "/delete"){
        var set = {
            delete: ~recordParam.delete,
        }
    }
    if(action == '/:_id'){
        var set = {
            votes: recordParam.votes+1,
        };
    }

    if(action == "/changeShowStatus"){
        var set = {
                show: ~recordParam.show,
            };
    }
    recordsDB.findAndModify(
        { _id: recordParam._id},
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve();
    });

    return deferred.promise;
}

function createRecord(record) {   
    var deferred = Q.defer();
    recordsDB.insert(
        record,
        function (err, doc) {
            if (err) deferred.reject(err);
            
            deferred.resolve();
        });

    return deferred.promise;
}

function getAllRecordsForUser(user) {
    //console.log(user+" ffff");
    var deferred = Q.defer();
    recordsDB.find({user: user},{sort : { votes : -1 } },function (err, record) {
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