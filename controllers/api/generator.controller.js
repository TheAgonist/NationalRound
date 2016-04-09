var config = require('config.json');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var shortid = require('shortid');
var router = express.Router();
var playService = require('services/generator.service');
//var sheetMusicService = require ('services/sheetMusic.service');
// routes
 var spawn = require('child_process');
 router.post('/generate', generate);
//router.put('/:_id', updateRecord);

module.exports = router;

function generate(req, res) {
    console.log('vliza vliza');
var filename = shortid.generate()+".mid";
  spawn.exec("th ./././lstm/sample.lua ./././lstm/cv/beethoven.t7 -filename ./././public/img/"+filename, function(error,stdout,stderr){
        
        if (error) {
                    console.log(error.stack);
                    console.log('Error code: '+error.code);
                    console.log('Signal received: '+error.signal);
                 }
                 console.log('stdout: ' + stdout);
                 console.log('stderr: ' + stderr);
                res.send(filename);

    });
    
}


