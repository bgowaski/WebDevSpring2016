/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, userModel) {

    var passport      = require('passport');
    var auth = authorized;

    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/creds", findUserByCredentials);

    app.get("/api/assignment/loggedin", loggedIn);
    app.post  ("/api/assignment/login", passport.authenticate('local'), login);
    app.post  ("/api/assignment/logout",         logoutUser);
    app.post  ("/api/assignment/register",       register);
    app.post  ("/api/assignment/user",     auth, createUser);
    app.get   ("/api/assignment/loggedin",       loggedin);
    app.get   ("/api/assignment/user",     auth, findAllUsers);
    app.put   ("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function(users){
                res.send(users);
            })
            .catch(function(error) {
                res.status(400).send(error);
            });
    }
    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function(result){
                    console.log("I Then");
                    console.log(result);
                    req.session.currentUser = result;
                    res.json(result);
                },
                function (error) {
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
                function (error) {
                    res.status(400).send(error);
                }
            )
    }


    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        userModel.updateUser(userId, user)
            .then(
                function (result) {
                    userModel.findUserById(userId)
                        .then(
                            function (result) {
                                res.json(result);
                            },
                            function (error) {
                                res.status(400).send(error);
                            }
                        );
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function loggedIn(req, res) {
        res.send(req.session.currentUser);
    }

    function logoutUser(req, res) {
        req.session.destroy();
        res.send(200);
    }

};