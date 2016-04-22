(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $scope){
        var vm = this;
        vm.location= $location;
        vm.logout = logout;
        console.log("In header")

        function logout(){
            console.log("Logging out");
            UserService
                .logoutUser()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();