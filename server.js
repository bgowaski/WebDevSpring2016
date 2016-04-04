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

var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.PASSPORT_SECRET || "My Secret",
    resave: true,
    saveUninitialized: true}));
app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
    //res.sendfile((__dirname + '/index.html'));
    res.setHeader('Access-Control-Allow-Origin', 'http://webdevspring2016-bgwebdevsp1602.rhcloud.com');
    next();
});
app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

+require('./public/assignment/server/app.js')(app, db, mongoose);
//require('./public/experiments/server/app.js')(app);
require('./public/YoProLiving/server/app.js')(app);

app.listen(port, ipaddress, function(){
    console.log('listening on: ' + ipaddress + ':' + port);
});