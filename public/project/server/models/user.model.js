var mongoose = require("mongoose");

module.exports = function(){
    var q = require("q");

    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        getMongooseModel: getMongooseModel,
        userLikes: userLikes,
        userDislikes: userDislikes
    };
    return api;

    function getMongooseModel() {
        return UserModel;
    }

    function userLikes (userId, object) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.favorites.push(object);
                doc.save (function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function userDislikes (userId, object) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (i in doc.favorites){
                    if (doc.favorites[i].id == object.id) {
                        doc.favorites.splice(i, 1);
                    }
                }
                doc.save (function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user){
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, user, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                UserModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(creds) {
        var deferred = q.defer();
        UserModel.findOne(
            { username: creds.username,
                password: creds.password },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne(
            { username: username },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

};