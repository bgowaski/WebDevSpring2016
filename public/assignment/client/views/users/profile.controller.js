(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService){
        var vm = this;
        vm.message = null;
        vm.errorMessage = null;

        vm.currentUser = {};
        var preservedUserInfo = {};

        function init() {
            UserService
                .getCurrentUser()
                //.then(function(response){
                //    if (response.data) {
                //        vm.currentUser = response.data;
                //        preservedUserInfo = preserveInfo(vm.currentUser);
                //    }
                //    else {
                //        $location.url("/home");
                //    }
                //});

            //Test Code

            var user = UserService.getCurrentUser();
            console.log(user);

            vm.currentUser = user;
            preservedUserInfo = preserveInfo(vm.currentUser);

        }
        init();

        vm.update = update;

        function update(){
            vm.message = null;
            vm.errorMessage = null;

            if (!vm.currentUser.username){
                vm.errorMessage = "Please Enter Username";
                vm.currentUser.username = preservedUserInfo.username;
                return;
            }
            if (!vm.currentUser.password){
                vm.errorMessage = "Please Enter Password";
                vm.currentUser.password = preservedUserInfo.password;
                return;
            }

            UserService
                .updateUser(vm.currentUser._id, vm.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    preservedUserInfo = preserveInfo(response.data);
                    vm.message = "Profile Has Been Updated";
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