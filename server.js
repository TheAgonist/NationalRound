require('rootpath')();
var express = require('express');
var app = express();
var formidable = require('formidable');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var uploadService = require('services/upload.service');

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy({defer: true}));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/play/getCurrentRecord', '/api/users/register','/api/upload/upload'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/play', require('./controllers/api/play.controller'));
app.use('/api/upload', require('./controllers/api/upload.controller'));
app.use('/api/sheetMusic', require('./controllers/api/sheetMusic.controller'));
app.use('/api/generator', require('./controllers/api/generator.controller'));

app.route('/upload')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                //console.log("Upload Finished of " + filename);
                var set = {
                    name: filename,
                    user: req.session.user,
                    show: -2,
                    votes: 0,
                    delete: false,
                };
                uploadService.create(set);
                res.redirect('http://localhost:3000/app/#/upload');           //where to go next
            });
        });
    });
// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
