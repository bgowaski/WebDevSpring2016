var LocalStrategy    = require('passport-local').Strategy;
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(app, model){

    var auth = authorized;

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post("/api/project/user", auth, createUser);
    app.get("/api/project/user", auth, findAllUsers);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedin', loggedin);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUserById);
    app.post("/api/project/user/:userId/like", userLikes);
    app.post("/api/project/user/:userId/dislike", userDislikes);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        model.findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['yo-pro'];

        model.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            emails: user.emails,
            phones: user.phones
        };

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["yo-pro"];
        }
        model.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null) {
                        return model.createUser(newUser)
                            .then(
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return model.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username === undefined) {
            if(isAdmin(req.user)) {
                model.findAllUsers()
                    .then(
                        function (users) {
                            res.json(users);
                        },
                        function () {
                            res.status(400).send(err);
                        }
                    );
            } else {
                res.status(403);
            }
        } else if (password === undefined) {
            model.findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    });
        } else {
            model.findUserByCredentials(req.query)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
    }

    function findUserById(req, res){
        var userId = req.params.id;
        model.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function updateUser(req, res){
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        newUser.roles = ['admin'];
        model.updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return model.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        if(isAdmin(req.user)) {
            model.deleteUserById(req.params.id)
                .then(
                    function(user){
                        return model.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        return user.roles.indexOf("admin") >= 0
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function userLikes(req, res) {
        var object  = req.body;
        var userId = req.params.userId;

        model.userLikes(userId, object)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userDislikes(req, res) {
        var object  = req.body;
        var userId = req.params.userId;

        model.userDislikes(userId, object)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};