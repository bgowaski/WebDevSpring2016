
var users = require('./user.mock.json');
module.exports = function() {
    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        user._id = (new Date()).getTime();
        users.push(user);
        return user;
    }

    function findUserByUsername(username){
        for(var x in users){
            if(users[x].username == username){
                return users[x];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials){
        for(var x in users){
            if(users[x].username == credentials.username && users[x].password == credentials.password){
                return users[x];
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        for(var x in users){
            if(users[x]._id == userId){
                return users[x];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        var result = null;
        for(var x in users){
            if(users[x]._id == userId){
                users[x].firstName = user.firstName || users[x].firstName;
                users[x].lastName = user.lastName || users[x].lastName;
                users[x].username = user.username || users[x].username;
                users[x].password = user.password || users[x].password;
                result = users[x];
                break;
            }
        }
        return result;
    }

    function deleteUser(userId) {
        for(var x in users){
            if(users[x]._id == userId){
                users[x].splice(x,1);
                return;
            }
        }
    }


};