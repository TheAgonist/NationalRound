var config = require('config.json');
var express = require('express');
var fs = require('fs-extra');
var router = express.Router();
var playService = require('services/play.service');
// routes
router.get('/all', getAllRecords);
router.get('/:userName', getAllForUser);
router.put('/delete', update);
router.put('/:_id', update);
router.put('/changeShowStatus',update);

module.exports = router;
function getAllRecords(req, res) {
    playService.getAll()
        .then(function (records) {
            if (records) {
                res.send(records);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllForUser(req, res){
    //console.log(req.session.user);
    playService.getAllRecordsForUser(req.session.user)
    .then(function (records) {
        if (records) {
            res.send(records);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function update(req, res) {
    playService.update(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}