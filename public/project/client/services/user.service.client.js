(function(){
    angular
        .module("YoProLivingApp")
        .factory("UserService", userService);

    function userService($http) {
        return {
            login: login,
            logout: logout,
            register: register,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            userLikes: userLikes,
            userDislikes: userDislikes
        };

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                emails: user.emails,
                phones: user.phones,
                admin: user.admin
            };
            return $http.put("/api/project/user/"+userId, newUser);
        }
        function userLikes(userId, object){
            return $http.post("/api/project/user/"+userId+"/like", object);
        }

        function userDislikes(userId, object){
            return $http.post("/api/project/user/"+userId+"/dislike", object);
        }
    }
})();