//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');



module.exports = function(app, assignment, project, passport) {
    //var UserModel = assignment.UserModel;

    passport.use('assignment', new LocalStrategy(localAssignmentStrategy));
    //passport.use('project', new LocalStrategy(localProjectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localAssignmentStrategy(username, password, done) {
        console.log("In the strategy");
        assignment
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User authenticated");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
                    if (error) { return done(error); }
                }
            );
    }
    //
    //function localProjectStrategy(username, password, done) {
    //    project
    //        .findUserByUsername(username)
    //        .then(
    //            function(user) {
    //                if(user && bcrypt.compareSync(password, user.password)) {
    //                    return done(null, user);
    //                } else {
    //                    return done(null, false);
    //                }
    //            },
    //            function(error) {
    //                if (error) { return done(error); }
    //            }
    //        );
    //}

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type == "assignment") {
            assignment
                .findUserById(user._id)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(error){
                        done(error, null);
                    }
                );
        }
        else if (user.type == "project") {
            assignment
                .findUserById(user._id)
                .then(
                    function (user) {
                        delete user.password;
                        done(null, user);
                    },
                    function (error) {
                        done(error, null);
                    }
                );
        }
    }


};