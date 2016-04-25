/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function (mongoose) {
    var userSchema = require('./user.schema.server.js')(mongoose);
    var q = require('q');


    var UserModel = mongoose.model('User', userSchema);

    var api = {
        //UserModel: UserModel,
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return UserModel;
    }

    function findUserByUsername(username) {
        //console.log(UserModel.findOne({username: username}));
        return UserModel.findOne({username: username});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
                username: credentials.username,
                password: credentials.password
            },
            function (error, result) {
                if (error) {
                    deferred.reject(error);
                }
                else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId, function (error, result) {
            if (error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

};