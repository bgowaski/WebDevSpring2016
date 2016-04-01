
(function(){
    angular
        .module("YoProLivingApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        var service = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password){
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/experiments/creds", credentials);
        }

        function findUserByUsername(username){
            var data = {
                username: username
            };
            return $http.post("/api/experiments/username", data);
        }

        function findAllUsers(){
            return $http.get("/api/experiments/user");
        }

        function createUser(user){
            return $http.post("/api/experiments/user", user);
        }

        function deleteUser(userId){
            return $http.delete("/api/experiments/user/" + userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/experiments/user/" + userId, user);
        }

    }

})();