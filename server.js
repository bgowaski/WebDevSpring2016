var express = require('express');
var app = express();
var multer = require('multer');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
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

console.log("secret");
console.log(process.env.PASSPORT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(cookieParser());
app.use(session({
    secret: process.env.PASSPORT_SECRET || "My Secret",
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    //res.sendfile((__dirname + '/index.html'));
    res.setHeader('Access-Control-Allow-Origin', 'http://webdevspring2016-bgwebdevsp1602.rhcloud.com');
    next();
});
app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

var assignment = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
var project = require("./public/YoProLiving/server/models/user.model.server.js")(db, mongoose);

//require('./public/assignment/server/app.js')(app, db, mongoose, assignment, passport);
//require('./public/experiments/server/app.js')(app);
//require('./public/YoProLiving/server/app.js')(app, db,mongoose, project);
//require('./public/passport/security.js')(app, assignment, project, passport);
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('17964134dc1e16f64862982efdfa2287');

require("./public/project/server/app.js")(app, brewdb);




app.listen(port, ipaddress, function(){
    console.log('listening on: ' + ipaddress + ':' + port);
});