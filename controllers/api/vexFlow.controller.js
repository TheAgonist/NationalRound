var config = require('config.json');
var express = require('express');
var router = express.Router();
var sheetMusicService = require('services/vexFlow.service');
// routes
router.get('/getRecord',getRecord)

module.exports = router;

function getRecordsForUser(req, res) {
        //console.log(req.user.sub);
    uploadService.get(req.user.sub)
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