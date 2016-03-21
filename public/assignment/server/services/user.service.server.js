/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, userModel) {
    app.post("/api/assignments/user", createUser);
    app.get("/api/assignments/user", findAllUsers);
    app.get("/api/assignments/user/:id", findUserById);
    app.post("/api/assignments/username", findUserByUsername);
    app.post("/api/assignments/creds", findUserByCredentials);
    app.put("/api/assignments/user/:id", updateUser);
    app.delete("/api/assignments/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(user);
    }

    function findUserByUsername(req, res){
        var data = req.body;
        var user = userModel.findUserByUsername(data.username);
        res.json(user);
    }

    function findUserByCredentials(req, res){
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        user = userModel.updateUser(userId, user);
        res.send(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId);
        res.send(200);
    }
};