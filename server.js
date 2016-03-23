var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// install and require the mongoose library
var mongoose      = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

//var http = require('http');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
    //res.sendfile((__dirname + '/index.html'));
    res.setHeader('Access-Control-Allow-Origin', 'http://webdevspring2016-bgwebdevsp1602.rhcloud.com');
    next();
});
app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

require('./public/assignment/server/app.js')(app);

app.listen(port, ipaddress);