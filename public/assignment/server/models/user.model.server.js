/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(mongoose) {
    var userSchema = require('./user.schema.server.js')(mongoose);
    var q = require('q');


    var UserModel = mongoose.model('User', userSchema);

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
        var deferred = q.defer();
        UserModel.findOne({username: username},function(error, result){
            if (error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId,function(error, result){
            if (error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne(credentials,function(error, result){
            if (error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(error, result){
           if (error){
               deferred.reject(error);
           }
           else {
               deferred.resolve(result);
           }
        });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user,function(error, result){
            if (error){
                deferred.reject(error);
            }
            else{
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findById(userId,function(error, result){
            if (error){
                deferred.reject(error);
            }
            else {
                result.firstName = user.firstName || users[x].firstName;
                result.lastName = user.lastName || users[x].lastName;
                result.username = user.username || users[x].username;
                result.password = user.password || users[x].password;
                result.save(function(error,result){
                    if (error){
                        deferred.reject(error);
                    }
                    else{
                        deferred.resolve(result);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findOneAndRemove({'_id': userId},function(error, result){
            if (error){
                deferred.reject(error);
            }
            else {
               deferred.resolve(result);
            }
        });
        return deferred.promise;
    }


};