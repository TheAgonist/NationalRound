var config = require('config.json');
var express = require('express');
var router = express.Router();
var uploadService = require('services/upload.service');
// routes
router.post('/post', upload);
router.get('/:userName',getRecordsForUser)
router.put('/:_id',changeStatus);

module.exports = router;

function upload(req, res) {
        //console.log(req);
    uploadService.create(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function getRecordsForUser(req, res) {
    uploadService.get(req.session.user)
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

function changeStatus(req, res){
	var recordId = req.body._id;
	uploadService.update(recordId, req.body)
		.then(function () {
			res.sendStatus(200);
		})
		.catch(function (err) {
			res.status(400).send(err);
		});
}