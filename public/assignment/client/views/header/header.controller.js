(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){
        var vm = this;
        vm.location= $location;
        vm.logout = logout;

        function logout(){
            UserService
                .logoutUser()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();