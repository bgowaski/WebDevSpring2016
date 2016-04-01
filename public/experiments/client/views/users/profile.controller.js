(function(){
    angular
        .module("YoProLivingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService){
        var vm = this;
        vm.message = null;
        vm.errorMessage = null;

        vm.currentUser = UserService.getCurrentUser();

        var preservedUserInfo = preserveInfo(vm.currentUser);

        function init() {
            if (!vm.currentUser) {
                $location.url("/home");
            }
        }
        init();

        vm.update = update;

        function update(){
            vm.message = null;
            vm.errorMessage = null;

            if (!vm.currentUser.username){
                vm.errorMessage = "Username cannot be empty";
                vm.currentUser.username = preservedUserInfo.username;
                return;
            }
            if (!vm.currentUser.password){
                vm.errorMessage = "Password cannot be empty";
                vm.currentUser.password = preservedUserInfo.password;
                return;
            }

            UserService
                .updateUser(vm.currentUser._id, vm.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    preservedUserInfo = preserveInfo(response.data);
                    vm.message = "Profile Successfully Updated";
                });
        }

        function preserveInfo(user){
            return {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                email: user.email
            };
        }

    }

})();