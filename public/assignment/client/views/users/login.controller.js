(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService){
        var vm = this;
        vm.login = login;

        vm.errorMessage = null;

        function login(user){
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if (response.data){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                    else {
                        vm.errorMessage = "Incorrect Login";
                    }
                });
        }
    }

})();