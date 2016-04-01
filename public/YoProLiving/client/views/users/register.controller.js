(function(){
    angular
        .module("YoProLivingApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;
        vm.errorMessage = null;

        vm.register = register;

        function register(user){

            if(!user.username){
                vm.errorMessage = "Please Enter Username";
                return;
            }
            if(!user.password || !user.password2){
                vm.errorMessage = "Please Enter Password";
                return;
            }
            if(user.password !== user.password2){
                vm.errorMessage = "Passwords Don't Match";
                return;
            }

            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });

        }
    }

})();