/**
 * Created by bgowaski on 3/17/16.
 */
(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {

            setCurrentUser: setCurrentUser,
            loginUser: loginUser,
            logoutUser: logoutUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            registerUser: registerUser,
            deleteUser: deleteUser,
            updateUserAdmin: updateUserAdmin,
            updateUserProfile: updateUserProfile

        };
        return service;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function logoutUser(){
            return $http.post("/api/assignment/logout");
        }

        function loginUser(user){
            return $http.post("/api/assignment/login", user);
        }

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function findUserByCredentials(username, password){
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/assignment/creds", credentials);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function registerUser(user){
            return $http.post("/api/assignment/register", user);
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user);
        }

        function deleteUser(userId){
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUserAdmin(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function updateUserProfile(userId, user){
            return $http.put("/api/assignment/userprofile/" + userId, user);
        }
    }
})();