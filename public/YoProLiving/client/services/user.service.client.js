/**
 * Created by bgowaski on 3/17/16.
 */
(function () {
    'use strict';

    angular
        .module("YoProLivingApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            deleteUser: deleteUser,
            createUser: createUser,
            updateUser: updateUser

        };
        return service;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password) {
            return $http.post("/api/YoProLiving/creds",{username:username, password:password});
        }

        function findUserByUsername(username) {
            return $http.get("/api/YoProLiving/user?username=" + username)
        }

        function findAllUsers() {
            return $http.get("/api/YoProLiving/user/");
        }

        function findUserById(userId) {
            return $http.get("/api/YoProLiving/user/" + userId + "/");
        }

        function createUser(user) {
            return $http.post("/api/YoProLiving/user/", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/YoProLiving/user/" + userId + "/");
        }

        function updateUser(userId, user) {
            return $http.put("/api/YoProLiving/user/" + userId + "/", user);
        }
    }
})();