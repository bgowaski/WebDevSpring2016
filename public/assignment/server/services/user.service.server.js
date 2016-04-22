/**
 * Created by bgowaski on 3/17/16.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {

    var auth = authorized;
    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/creds", findUserByCredentials);
    app.put("/api/assignment/user/:id", auth, updateUserAdmin);
    app.put("/api/assignment/userprofile/:id", auth, updateUserProfile);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    app.post("/api/assignment/register", registerUser);
    app.post("/api/assignment/logout", logoutUser);
    app.post("/api/assignment/login", passport.authenticate('assignment'), loginUser);
    app.get("/api/assignment/loggedin", loggedIn);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
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


    function isAdmin(user) {
        return (user.roles.indexOf("admin") > -1);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logoutUser(req, res) {
        req.logOut();
        res.send(200);
    }

    function loginUser(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        if (isAdmin(req.user)) {
            userModel.deleteUser(userId)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(error){
                        res.status(400).send(error);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(error){
                        res.status(400).send(error);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUserAdmin(req, res) {
        var newUser = req.body;
        var userId = req.params.id;
        delete newUser._id;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password);
        }

        userModel.updateUser(userId, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(error){
                    res.status(400).send(error);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }
    function updateUserProfile(req, res) {
        var newUser = req.body;
        var userId = req.params.id;
        delete newUser._id;

        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password);
        }

        userModel.updateUser(userId, newUser)
            .then(
                function (user) {
                    return userModel.findUserById(newUser._id);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user){
                    res.json(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (error) {
                        res.status(400).send(error);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (result) {
                    res.json(result);
                },
                function ( error ) {
                    res.status(400).send(error);
                }
            );
    }
    function findUserByCredentials(req, res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (result) {
                    req.session.currentUser = result;
                    res.json(result);
                },
                function ( error ) {
                    res.status(400).send(error);
                }
            )
    }

    function registerUser (req, res) {
        var newUser = req.body;
        newUser.roles = ["user"];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if (user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function ( error ) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(error) {
                            if(error) {
                                res.status(400).send(error);
                            } else {
                                console.log(user);
                                res.json(user);
                            }
                        });
                    }
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(error){
                                    res.status(400).send(error);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(error){
                    res.status(400).send(error);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(error){
                    res.status(400).send(error);
                }
            )
    }
};