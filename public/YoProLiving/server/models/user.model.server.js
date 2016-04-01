/**
 * Created by bgowaski on 3/17/16.
 */
var users = require('./user.mock.json');
module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserByUsername(username){
        for(var x in users){
            if(users[x].username == username){
                return users[x];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var x in users){
            if(users[x]._id == userId){
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

    function createUser(user) {
        user._id = (new Date()).getTime();
        users.push(user);
        return user;
    }

    function updateUser(userId, user) {
        var result = null;
        for(var x in users){
            if(users[x]._id == userId){
                users[x].firstName = user.firstName || users[x].firstName;
                users[x].lastName = user.lastName || users[x].lastName;
                users[x].username = user.username || users[x].username;
                users[x].password = user.password || users[x].password;
                users[x].age = user.age || users[x].age;
                users[x].occupation = user.occupation || users[x].occupation;
                users[x].location = user.location || users[x].location;
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