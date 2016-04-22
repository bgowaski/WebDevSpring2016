(function()
{
    angular
        .module("YoProLivingApp")
        .controller("LoginController", ['UserService', '$location', '$rootScope', LoginController]);

    function LoginController(UserService, $location, $rootScope)
    {
        var vm = this;

        vm.login = login;

        function login(user){
            if(user)
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
        }
    }
})();