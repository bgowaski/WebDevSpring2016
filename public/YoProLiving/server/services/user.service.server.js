/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, userModel, passport) {

    var auth = authorized;
    var bcrypt = require('bcrypt-nodejs');
    var LocalStrategy = require('passport-local').Strategy;


    app.get   ("/api/YoProLiving/user/:id", findUserById);
    app.post  ("/api/YoProLiving/creds", findUserByCredentials);

    app.get   ("/api/YoProLiving/loggedIn", loggedIn);
    app.post  ("/api/YoProLiving/login", passport.authenticate('YoProLiving'), login);
    app.post  ("/api/YoProLiving/logout",         logoutUser);
    app.post  ("/api/YoProLiving/user", auth, createUser);
    app.post  ("/api/YoProLiving/register", registerUser);
    app.get   ("/api/YoProLiving/user",     auth, findAllUsers);
    app.delete("/api/YoProLiving/user/:id", auth, deleteUser);
    app.put   ("/api/YoProLiving/user/:id", auth, updateUserAdmin);
    app.put   ("/api/YoProLiving/userprofile/:id", auth, updateUserProfile);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized (req, res, next) {
        console.log(req.user);
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                        if(user && bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
             },
            function(err) {
                    if (err) { return done(err); }
            });
    }
    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    app.get("/api/YoProLiving/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username)
            .then(function(user)
            {
                if(user != '0' || req.user._id == req.params.id)
                {
                    userModel.findUserById(req.params.id, function(user)
                    {
                        res.send(user);
                    });
                }
            })
            .catch(function(error){
                res.status(500).json(error);
            });
    });

    app.delete("/api/YoProLiving/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username)
            .then(function(user)
            {
                if(user != '0')
                {
                    userModel.remove({_id : req.params.id}, function(count)
                    {
                        res.send(count);
                    });
                }
            })
            .catch(function(error){
                res.status(500).json(error);
            });
    });

    app.get("/api/YoProLiving/user", function(req, res)
    {
        isUserAdmin(req.user.username)
            .then(function(user)
            {
                if(user != '0')
                {
                    userModel.find(function(users)
                    {
                        res.json(users);
                    });
                }
            })
            .catch(function(error){
                res.status(500).json(error);
            });
    });

    app.post("/api/YoProLiving/user", function(req, res)
    {
        var user = req.body;
        if(user.roles)
        {
            user.roles = user.roles.split(",");
        }
        else
        {
            user.roles = ["renter"];
        }
        userModel.findUserById({username: user.username})
            .then(function(existingUser)
            {
                if(existingUser != null)
                {
                    res.json(null);
                }
                else
                {
                    userModel.create(user, function(result)
                    {
                        res.json(result);
                    });
                }
            })
            .catch(function(error){
                res.status(500).json(error);
            });
    });

    function login(req, res)
    {
        res.json(req.user);
    }

    app.put("/api/YoProLiving/update", function(req, res)
    {
        userModel.findUserById(req.body._id)
            .then(function(foundUser)
            {
                var user = req.body;
                if(user.roles.indexOf(",") > 0)
                {
                    user.roles = user.roles.split(",");
                }
                foundUser.update(req.body, function(count)
                {
                    res.send(count);
                });
            })
            .catch(function(error){
                res.status(500).json(error);
            })
    });

    app.get('/api/YoProLiving/loggedin', function(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/YoProLiving/logout', function(req, res)
    {
        req.logOut();
        res.send(200);
    });

    app.get('/api/YoProLiving/admin', function(req, res)
    {
        if(req.isAuthenticated())
        {
            userModel.findUserById({username: req.user.username})
                .then(function(foundUser)
                {
                    if(foundUser.roles.indexOf('admin') > -1)
                    {
                        res.json(foundUser);
                    }
                    else
                    {
                        res.send('0');
                    }
                })
                .catch(function(error){
                    res.status(500).json(error);
                });
        }
        else
        {
            res.send('0');
        }
    });

    function isUserAdmin(username, callback)
    {
        userModel.findUserById({username: username})
            .then(function(foundUser)
            {
                if(foundUser.roles.indexOf('admin') > -1)
                {
                    callback(foundUser);
                }
                else
                {
                    callback('0');
                }
            })
            .catch(function(error){
                res.status(500).json(error);
            });
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
                function(err){
                    res.status(400).send(error);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
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
                function(error){
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
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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