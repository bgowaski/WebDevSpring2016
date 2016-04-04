/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/creds", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout", logoutUser);
    app.get("/api/assignment/loggedin", loggedIn);

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