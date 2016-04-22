/**
 * Created by bgowaski on 3/17/16.
 */
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db, mongoose, passport) {
    //var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel    = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel   = require("./models/field.model.server.js")(db, mongoose);
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService  = require("./services/fields.service.server.js")(app, fieldModel);

    var UserModel   = require("./models/user.model.server.js")(mongoose);
    var UserService = require("./services/user.service.server.js")(app, UserModel, passport);

    passport.use('YoProLiving',new LocalStrategy(
        function(username, password, done)
        {
            console.log('project local', username, password);
            UserModel.findUserByCredentials({username: username, password: password})
                .then(function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                })
                .catch(function(error){
                    return done(error);
                })
        }));

    passport.serializeUser(function(user, done)
    {
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        done(null, user);
    });
};
