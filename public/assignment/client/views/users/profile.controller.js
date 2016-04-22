(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService){
        var vm = this;
        vm.message = null;
        vm.errorMessage = null;


        vm.currentUser = $rootScope.currentUser;
        //var preservedUserInfo = preserveInfo(vm.currentUser);

        function init() {
            delete vm.currentUser.password;
        }
        init();

        vm.update = update;

        function update(){
            vm.message = null;
            vm.errorMessage = null;
            console.log(vm.currentUser);
            if (!vm.currentUser.username){
                vm.errorMessage = "Please Enter Username";
                //vm.currentUser.username = "";
                return;
            }
            if (!vm.currentUser.password){
                vm.errorMessage = "Please Enter Password";
                //vm.currentUser.password = password;
                return;
            }

            UserService
                .updateUserProfile(vm.currentUser._id, vm.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    vm.currentuser = response.data;
                    vm.message = "Profile Has Been Updated";
                });
        }

        //function preserveInfo(user){
        //    return {
        //        _id: user._id,
        //        username: user.username,
        //        password: user.password,
        //        firstName: user.firstName,
        //        lastName: user.lastName,
        //        roles: user.roles,
        //        email: user.email
        //    };
        //}

    }

})();