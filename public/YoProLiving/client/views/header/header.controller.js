(function () {
    angular
        .module("YoProLivingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){
        var vm = this;
        vm.location= $location;
        vm.logout = logout;

        function logout(){
            UserService.logout();
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();